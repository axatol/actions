package main

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/axatol/actions/watch-octopus-deploy-task/internal"
)

func main() {
	serverURL := os.Getenv("OCTOPUS_URL")
	apiKey := os.Getenv("OCTOPUS_API_KEY")
	accessToken := os.Getenv("OCTOPUS_ACCESS_TOKEN")
	taskIDs := internal.GetMultivalueInput("TASK_IDS")

	if serverURL == "" {
		fmt.Printf("::error::must provide the server url")
		os.Exit(1)
	}

	if apiKey == "" && accessToken == "" {
		fmt.Printf("::error::must provide an api key or access token")
		os.Exit(1)
	}

	fmt.Printf("got task ids: [%s]\n", strings.Join(taskIDs, ", "))

	if len(taskIDs) < 1 {
		fmt.Printf("::error::must provide at least one task id")
		os.Exit(1)
	}

	fmt.Printf("watching logs for server tasks: %s\n", strings.Join(taskIDs, ", "))

	printer := internal.NewPrinter()
	od := internal.OctopusDeploy{
		ServerURL:   serverURL,
		APIKey:      apiKey,
		AccessToken: accessToken,
	}

	for _, taskID := range taskIDs {
		if err := WatchTask(od, printer, taskID); err != nil {
			fmt.Printf("::error::%s", err.Error())
			os.Exit(1)
		}
	}
}

func WatchTask(od internal.OctopusDeploy, printer internal.Printer, taskID string) error {
	task, err := od.GetTaskDetail(taskID)
	if err != nil {
		return err
	}

	if task == nil {
		return fmt.Errorf("no server task found for id: %s", taskID)
	}

	task.Task.Header()
	defer task.Task.Footer()

	// print full log and exit
	if task.Task.IsCompleted {
		logs := FlattenActivityLogs(task.ActivityLogs, 0)

		for _, log := range logs {
			printer.Print(log.String())
		}

		return nil
	}

	ticker := time.NewTicker(time.Second * 3)

	// wait for start
	fmt.Println("waiting for task to start")
	for range ticker.C {
		if task != nil && task.Task.StartTime != nil {
			break
		}

		fmt.Printf("task state: %s\n", task.Task.State)
	}

	// wait for completion
	fmt.Println("watching task")
	for range ticker.C {
		task, err = od.GetTaskDetail(taskID)
		if err != nil {
			return err
		}

		logs := FlattenActivityLogs(task.ActivityLogs, 0)
		for _, log := range logs {
			printer.Print(log.String())
		}

		if task.Task.IsCompleted &&
			task.Task.State != "Queued" &&
			task.Task.State != "Executing" &&
			task.Task.State != "Cancelling" {
			break
		}
	}

	return nil
}

func FlattenActivityLogs(activities []internal.ActivityLog, depth int) []internal.LogElement {
	elements := []internal.LogElement{}

	for _, activity := range activities {
		if activity.Status == "Pending" {
			continue
		}

		start := activity.StartLogElement()
		start.Depth = depth
		elements = append(elements, start)

		for _, element := range activity.LogElements {
			element.Depth = depth
			elements = append(elements, element)
		}

		elements = append(elements, FlattenActivityLogs(activity.Children, depth+1)...)

		if activity.Ended != nil {
			end := activity.EndLogElement()
			end.Depth = depth
			elements = append(elements, end)
		}
	}

	return elements
}
