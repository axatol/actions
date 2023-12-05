package internal

import (
	"fmt"
	"strings"
	"time"
)

type Page[T any] struct {
	TotalResults int
	ItemsPerPage int
	Items        []T
}

type Event struct {
	Id       string
	SpaceId  string
	Category string
	Occurred string
	Message  string
}

type TaskDetail struct {
	Task         Task
	ActivityLogs []ActivityLog
}

type Task struct {
	Id                         string
	SpaceId                    string
	Name                       string
	Description                string
	State                      string
	QueueTime                  *time.Time
	StartTime                  *time.Time
	CompletedTime              *time.Time
	Duration                   string
	IsCompleted                bool
	FinishedSuccessfully       bool
	HasPendingInterruptions    bool
	HasBeenPickedUpByProcessor bool
}

func (t Task) Header() {
	fmt.Printf("Name:          %s\n", t.Name)
	fmt.Printf("Description:   %s\n", t.Description)
	fmt.Printf("Id:            %s\n", t.Id)
	fmt.Printf("Space id:      %s\n", t.SpaceId)
	fmt.Printf("Current state: %s\n", t.State)
}

func (t Task) Footer() {
	fmt.Printf("Duration:       %s\n", t.Duration)
	fmt.Printf("Final state:    %s\n", t.State)
}

type ActivityLog struct {
	Id          string
	Name        string
	Status      string
	Started     *time.Time
	Ended       *time.Time
	Children    []ActivityLog
	LogElements []LogElement
}

func (al ActivityLog) StartLogElement() LogElement {
	return LogElement{
		Category:    "Info",
		OccurredAt:  al.Started,
		MessageText: fmt.Sprintf("== Started: %s ==", al.Name),
	}
}

func (al ActivityLog) EndLogElement() LogElement {
	return LogElement{
		Category:    "Info",
		OccurredAt:  al.Ended,
		MessageText: fmt.Sprintf("== Ended: %s ==", al.Name),
	}
}

type LogElement struct {
	// Depth is an internal field to keep track of nested steps
	Depth       int
	Category    string
	OccurredAt  *time.Time
	MessageText string
}

func (le LogElement) String() string {
	// 8 is the length of the longest category "abandoned"
	severity := le.Category + strings.Repeat(" ", 8-len(le.Category))
	padding := Dim(strings.Repeat("· ", le.Depth))
	timestamp := le.OccurredAt.Local().Format(time.RFC1123)
	return fmt.Sprintf("%s | %s | %s%s ", timestamp, severity, padding, le.MessageText)
}
