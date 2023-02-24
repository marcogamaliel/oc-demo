import { SyncConf } from "../models/sync-config.model"

export abstract class SyncConfRepository {
  static syncConf: SyncConf = {
    retry: 3,
    retryDelay: 1000,
    period: 1000,
  }

  static async get(): Promise<SyncConf> {
    return SyncConfRepository.syncConf
  }

  static async save(syncConf: SyncConf): Promise<void> {
    SyncConfRepository.syncConf = syncConf
  }
}