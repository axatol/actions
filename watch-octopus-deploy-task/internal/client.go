package internal

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
)

type OctopusDeploy struct {
	ServerURL string
	APIKey    string
}

func (od *OctopusDeploy) get(endpoint string, query url.Values, result any) error {
	url := fmt.Sprintf("%s/api/%s?%s", od.ServerURL, endpoint, query.Encode())
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return err
	}

	req.Header.Add("X-Octopus-ApiKey", od.APIKey)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}

	if err := json.NewDecoder(res.Body).Decode(result); err != nil {
		return err
	}

	if os.Getenv("DEBUG") == "true" {
		fmt.Printf("::debug::%+v\n", result)
	}

	return nil
}

func (od *OctopusDeploy) GetTaskDetail(id string) (*TaskDetail, error) {
	var taskDetail TaskDetail
	if err := od.get(fmt.Sprintf("tasks/%s/details", id), nil, &taskDetail); err != nil {
		return nil, err
	}

	return &taskDetail, nil
}

func (od *OctopusDeploy) ListTaskEvents(regarding string) ([]Event, error) {
	var events Page[Event]
	if err := od.get("events", url.Values{"regardingAny": {regarding}}, &events); err != nil {
		return nil, err
	}

	return events.Items, nil
}
