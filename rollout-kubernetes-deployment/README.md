# rollout-kubernetes-deployment

Rollout restart a kubernetes deployment and optionally wait for the old pods to terminate

## Usage

```yaml
- uses: axatol/actions/rollout-kubernetes-deployment@release
  with:
    # Deployment namespace
    namespace: "actions-runner-system"

    # Deployment name
    deployment-name: "actions-runner-controller"

    # Waits for old pods to terminate
    wait: "false"

    # How long to wait for each pod to terminate
    wait-timeout: "300s"
```

### Outputs

- `value`: Pod selectors for use with kubectl, e.g. `key=val,key=val`

## Examples

### Restart a deployment

```yaml
- uses: axatol/actions/rollout-kubernetes-deployment@release
  with:
    namespace: kube-system
    deployment-name: coredns
```

### Restart and wait for pods to terminate

```yaml
- uses: axatol/actions/rollout-kubernetes-deployment@release
  with:
    namespace: kube-system
    deployment-name: traefik
    wait: true
```
