package main

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/axatol/actions/watch-octopus-deploy-task/internal"
)

func main() {
	serverURL := internal.RequireEnv("SERVER_URL")
	apiKey := internal.RequireEnv("API_KEY")
	taskIDs := internal.MultivalueEnv("TASK_IDS")

	fmt.Printf("Got task ids: [%s]", strings.Join(taskIDs, ", "))

	if len(taskIDs) < 1 {
		return
	}

	fmt.Printf("Watching logs for server tasks: %s\n", strings.Join(taskIDs, ", "))

	od := internal.OctopusDeploy{ServerURL: serverURL, APIKey: apiKey}
	printer := internal.NewPrinter()

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
		logs = internal.SortLogElements(logs)

		for _, log := range logs {
			printer.Print(log.String())
		}

		return nil
	}

	ticker := time.NewTicker(time.Second * 3)

	// wait for start
	fmt.Println("Waiting for task to start")
	for range ticker.C {
		if task != nil && task.Task.StartTime != nil {
			break
		}

		fmt.Printf("Task state: %s\n", task.Task.State)
	}

	// wait for completion
	fmt.Println("Watching task")
	for range ticker.C {
		task, err = od.GetTaskDetail(taskID)
		if err != nil {
			return err
		}

		// all done
		if task.Task.IsCompleted {
			break
		}

		// pending manual approval
		if task.Task.HasPendingInterruptions {
			continue
		}

		logs := FlattenActivityLogs(task.ActivityLogs, 0)
		logs = internal.SortLogElements(logs)
		for _, log := range logs {
			printer.Print(log.String())
		}
	}

	return nil
}

func FlattenActivityLogs(activities []internal.ActivityLog, depth int) []internal.LogElement {
	elements := []internal.LogElement{}

	for _, activity := range activities {
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
