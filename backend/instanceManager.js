import { launchDockerInstance, terminateInstance } from "./ec2config.js";
import {
  getAvailableInstance,
  registerInstance,
  incrementContainer,
  decrementContainer,
} from "./containerTracker.js";

export async function getOrLaunchInstance() {
  const existing = getAvailableInstance();
  if (existing) {
    incrementContainer(existing.instanceId);
    return existing;
  }

  const { instanceId, publicIp } = await launchDockerInstance();
  registerInstance(instanceId, publicIp);
  incrementContainer(instanceId);
  return { instanceId, publicIp };
}

export async function releaseContainer(instanceId) {
  const shouldTerminate = decrementContainer(instanceId);
  if (shouldTerminate) {
    await terminateInstance(instanceId);
  }
}
