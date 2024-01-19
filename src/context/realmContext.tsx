import Realm, { ObjectSchema } from 'realm';
import { APP_SECRET } from '@env';
import { createRealmContext } from '@realm/react';
import { realm_key } from './../constants';

const encryptionKey = new Int8Array(64);

class Wallet extends Realm.Object<Wallet> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Wallet',
    properties: {
      _id: 'objectId',
      type: 'string',
      privateKeys: 'string',
      nmemonic: 'string',
      address: 'string',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Wallet],
  schemaVersion: 1,
  encryptionKey,
  path: 'orbyt.realm',
};

const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig);

export { RealmProvider, useRealm, useObject, useQuery };
