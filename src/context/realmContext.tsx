import Realm, { ObjectSchema } from 'realm';
import { createRealmContext } from '@realm/react';

const encryptionKey = new Int8Array(64);

class Settings extends Realm.Object<Settings> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Settings',
    properties: {
      _id: 'objectId',
      currency: 'string',
      currencySymbol: 'string',
      network: 'string',
      createdAt: 'date',
    },
    primaryKey: '_id',
  };
}

class Wallet extends Realm.Object<Wallet> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Wallet',
    properties: {
      _id: 'objectId',
      type: 'string',
      privateKey: 'string',
      publicKey: 'string?',
      nmemonic: 'string?',
      address: 'string',
      network: 'string?',
      createdAt: 'date',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Settings, Wallet],
  schemaVersion: 10,
  encryptionKey,
  path: 'orbyt.realm',
};

const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);

export { RealmProvider, useRealm, useObject, useQuery };
