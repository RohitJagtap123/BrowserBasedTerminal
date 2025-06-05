import { launchDockerInstance, terminateInstance } from "./ec2config.js";
import {
  getAvailableInstance,
  registerInstance,
  incrementContainer,
  decrementContainer,
} from "./containerTracker.js"; // Already updated for MongoDB

export async function getOrLaunchInstance() {
  const existing = await getAvailableInstance(); // MongoDB-aware
  if (existing) {
    await incrementContainer(existing.instanceId); // MongoDB-aware
    return existing;
  }

  const { instanceId, publicIp } = await launchDockerInstance();
  await registerInstance(instanceId, publicIp); // MongoDB-aware
  await incrementContainer(instanceId); // MongoDB-aware
  return { instanceId, publicIp };
}

export async function releaseContainer(instanceId) {
  const shouldTerminate = await decrementContainer(instanceId); // MongoDB-aware
  if (shouldTerminate) {
    await terminateInstance(instanceId);
  }
}
