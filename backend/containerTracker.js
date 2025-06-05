import { Ec2Instance } from './models/Ec2Instance.js';

/**
 * Register an instance if it's not already in the DB.
 */
export async function registerInstance(instanceId, publicIp) {
  await Ec2Instance.updateOne(
    { instanceId },
    { $setOnInsert: { containerCount: 0, publicIp } },
    { upsert: true }
  );
}

/**
 * Returns the first instance with fewer than 2 containers.
 */
export async function getAvailableInstance() {
  const instance = await Ec2Instance.findOne({ containerCount: { $lt: 2 } });
  if (instance) {
    return { instanceId: instance.instanceId, publicIp: instance.publicIp };
  }
  return null;
}

/**
 * Increments container count for an instance.
 */
export async function incrementContainer(instanceId) {
  await Ec2Instance.updateOne(
    { instanceId },
    { $inc: { containerCount: 1 } }
  );
}

/**
 * Decrements container count; deletes if count hits zero.
 * Returns `true` if the instance should be terminated.
 */
export async function decrementContainer(instanceId) {
  const instance = await Ec2Instance.findOneAndUpdate(
    { instanceId },
    { $inc: { containerCount: -1 } },
    { new: true }
  );

  // ✅ Handle case when instance is not found in DB
  if (!instance) {
    console.warn(`Instance not found in DB: ${instanceId}`);
    return false; // Do not terminate EC2 if DB entry is missing
  }

  // ✅ Defensive: prevent containerCount going below 0
  if (instance.containerCount < 0) {
    await Ec2Instance.updateOne(
      { instanceId },
      { $set: { containerCount: 0 } }
    );
    return false;
  }

  if (instance.containerCount === 0) {
    console.log(`All containers exited on ${instanceId}, terminating.`);
    await Ec2Instance.deleteOne({ instanceId });
    return true; // signal to terminate
  }

  return false; // don't terminate
}
