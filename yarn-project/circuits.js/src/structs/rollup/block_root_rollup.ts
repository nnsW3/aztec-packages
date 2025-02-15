import { Fr } from '@aztec/foundation/fields';
import { bufferSchemaFor } from '@aztec/foundation/schemas';
import { BufferReader, type Tuple, serializeToBuffer } from '@aztec/foundation/serialize';
import { bufferToHex, hexToBuffer } from '@aztec/foundation/string';
import { type FieldsOf } from '@aztec/foundation/types';

import {
  ARCHIVE_HEIGHT,
  BLOBS_PER_BLOCK,
  FIELDS_PER_BLOB,
  L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH,
  NESTED_RECURSIVE_PROOF_LENGTH,
} from '../../constants.gen.js';
import { RootParityInput } from '../parity/root_parity_input.js';
import { AppendOnlyTreeSnapshot } from '../trees/append_only_tree_snapshot.js';
import { PreviousRollupData } from './previous_rollup_data.js';

export class BlockRootRollupData {
  constructor(
    /**
     * The original and converted roots of the L1 to L2 messages subtrees.
     */
    public l1ToL2Roots: RootParityInput<typeof NESTED_RECURSIVE_PROOF_LENGTH>,
    /**
     * Sibling path of the new L1 to L2 message tree root.
     */
    public newL1ToL2MessageTreeRootSiblingPath: Tuple<Fr, typeof L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH>,
    /**
     * Snapshot of the L1 to L2 message tree at the start of the rollup.
     */
    public startL1ToL2MessageTreeSnapshot: AppendOnlyTreeSnapshot,
    /**
     * Sibling path of the new block tree root.
     */
    public newArchiveSiblingPath: Tuple<Fr, typeof ARCHIVE_HEIGHT>,
    /**
     * The hash of the block preceding this one.
     */
    public previousBlockHash: Fr,
    /**
     * TODO(#7346): Temporarily added prover_id while we verify block-root proofs on L1
     */
    public proverId: Fr,
    /**
     * Flat list of all tx effects which will be added to the blob.
     * Below line gives error 'Type instantiation is excessively deep and possibly infinite. ts(2589)'
     * Tuple<Fr, FIELDS_PER_BLOB * BLOBS_PER_BLOCK>
     */
    public blobFields: Fr[],
    /**
     * KZG commitments representing the blob (precomputed in ts, injected to use inside circuit).
     * TODO(Miranda): Rename to kzg_commitment to match BlobPublicInputs?
     */
    public blobCommitments: Tuple<Tuple<Fr, 2>, typeof BLOBS_PER_BLOCK>,
    /**
     * The hash of eth blob hashes for this block
     * See yarn-project/foundation/src/blob/index.ts or body.ts for calculation
     */
    public blobsHash: Fr,
  ) {}

  /**
   * Serializes the inputs to a buffer.
   * @returns - The inputs serialized to a buffer.
   */
  toBuffer() {
    return serializeToBuffer(...BlockRootRollupData.getFields(this));
  }

  /**
   * Serializes the inputs to a hex string.
   * @returns The instance serialized to a hex string.
   */
  toString() {
    return bufferToHex(this.toBuffer());
  }

  /**
   * Creates a new instance from fields.
   * @param fields - Fields to create the instance from.
   * @returns A new RootRollupInputs instance.
   */
  static from(fields: FieldsOf<BlockRootRollupData>): BlockRootRollupData {
    return new BlockRootRollupData(...BlockRootRollupData.getFields(fields));
  }

  /**
   * Extracts fields from an instance.
   * @param fields - Fields to create the instance from.
   * @returns An array of fields.
   */
  static getFields(fields: FieldsOf<BlockRootRollupData>) {
    return [
      fields.l1ToL2Roots,
      fields.newL1ToL2MessageTreeRootSiblingPath,
      fields.startL1ToL2MessageTreeSnapshot,
      fields.newArchiveSiblingPath,
      fields.previousBlockHash,
      fields.proverId,
      fields.blobFields,
      fields.blobCommitments,
      fields.blobsHash,
    ] as const;
  }

  /**
   * Deserializes the inputs from a buffer.
   * @param buffer - A buffer to deserialize from.
   * @returns A new RootRollupInputs instance.
   */
  static fromBuffer(buffer: Buffer | BufferReader): BlockRootRollupData {
    const reader = BufferReader.asReader(buffer);
    return new BlockRootRollupData(
      RootParityInput.fromBuffer(reader, NESTED_RECURSIVE_PROOF_LENGTH),
      reader.readArray(L1_TO_L2_MSG_SUBTREE_SIBLING_PATH_LENGTH, Fr),
      reader.readObject(AppendOnlyTreeSnapshot),
      reader.readArray(ARCHIVE_HEIGHT, Fr),
      Fr.fromBuffer(reader),
      Fr.fromBuffer(reader),
      // Below line gives error 'Type instantiation is excessively deep and possibly infinite. ts(2589)'
      // reader.readArray(FIELDS_PER_BLOB, Fr),
      Array.from({ length: FIELDS_PER_BLOB * BLOBS_PER_BLOCK }, () => Fr.fromBuffer(reader)),
      reader.readArray(BLOBS_PER_BLOCK, { fromBuffer: () => reader.readArray(2, Fr) }),
      Fr.fromBuffer(reader),
    );
  }

  /**
   * Deserializes the inputs from a hex string.
   * @param str - A hex string to deserialize from.
   * @returns A new RootRollupInputs instance.
   */
  static fromString(str: string) {
    return BlockRootRollupData.fromBuffer(hexToBuffer(str));
  }

  /** Returns a buffer representation for JSON serialization. */
  toJSON() {
    return this.toBuffer();
  }

  /** Creates an instance from a hex string. */
  static get schema() {
    return bufferSchemaFor(BlockRootRollupData);
  }
}

/**
 * Represents inputs of the block root rollup circuit.
 */
export class BlockRootRollupInputs {
  constructor(
    /**
     * The previous rollup data from 2 merge or base rollup circuits.
     */
    public previousRollupData: [PreviousRollupData, PreviousRollupData],
    public data: BlockRootRollupData,
  ) {}

  /**
   * Serializes the inputs to a buffer.
   * @returns - The inputs serialized to a buffer.
   */
  toBuffer() {
    return serializeToBuffer(...BlockRootRollupInputs.getFields(this));
  }

  /**
   * Serializes the inputs to a hex string.
   * @returns The instance serialized to a hex string.
   */
  toString() {
    return bufferToHex(this.toBuffer());
  }

  /**
   * Creates a new instance from fields.
   * @param fields - Fields to create the instance from.
   * @returns A new RootRollupInputs instance.
   */
  static from(fields: FieldsOf<BlockRootRollupInputs>): BlockRootRollupInputs {
    return new BlockRootRollupInputs(...BlockRootRollupInputs.getFields(fields));
  }

  /**
   * Extracts fields from an instance.
   * @param fields - Fields to create the instance from.
   * @returns An array of fields.
   */
  static getFields(fields: FieldsOf<BlockRootRollupInputs>) {
    return [fields.previousRollupData, fields.data] as const;
  }

  /**
   * Deserializes the inputs from a buffer.
   * @param buffer - A buffer to deserialize from.
   * @returns A new RootRollupInputs instance.
   */
  static fromBuffer(buffer: Buffer | BufferReader): BlockRootRollupInputs {
    const reader = BufferReader.asReader(buffer);
    return new BlockRootRollupInputs(
      [reader.readObject(PreviousRollupData), reader.readObject(PreviousRollupData)],
      reader.readObject(BlockRootRollupData),
    );
  }

  /**
   * Deserializes the inputs from a hex string.
   * @param str - A hex string to deserialize from.
   * @returns A new RootRollupInputs instance.
   */
  static fromString(str: string) {
    return BlockRootRollupInputs.fromBuffer(hexToBuffer(str));
  }

  /** Returns a buffer representation for JSON serialization. */
  toJSON() {
    return this.toBuffer();
  }

  /** Creates an instance from a hex string. */
  static get schema() {
    return bufferSchemaFor(BlockRootRollupInputs);
  }
}

export class SingleTxBlockRootRollupInputs {
  constructor(public previousRollupData: [PreviousRollupData], public data: BlockRootRollupData) {}

  /**
   * Serializes the inputs to a buffer.
   * @returns - The inputs serialized to a buffer.
   */
  toBuffer() {
    return serializeToBuffer(...SingleTxBlockRootRollupInputs.getFields(this));
  }

  /**
   * Serializes the inputs to a hex string.
   * @returns The instance serialized to a hex string.
   */
  toString() {
    return bufferToHex(this.toBuffer());
  }

  /**
   * Creates a new instance from fields.
   * @param fields - Fields to create the instance from.
   * @returns A new RootRollupInputs instance.
   */
  static from(fields: FieldsOf<SingleTxBlockRootRollupInputs>): SingleTxBlockRootRollupInputs {
    return new SingleTxBlockRootRollupInputs(...SingleTxBlockRootRollupInputs.getFields(fields));
  }

  /**
   * Extracts fields from an instance.
   * @param fields - Fields to create the instance from.
   * @returns An array of fields.
   */
  static getFields(fields: FieldsOf<SingleTxBlockRootRollupInputs>) {
    return [fields.previousRollupData, fields.data] as const;
  }

  /**
   * Deserializes the inputs from a buffer.
   * @param buffer - A buffer to deserialize from.
   * @returns A new RootRollupInputs instance.
   */
  static fromBuffer(buffer: Buffer | BufferReader): SingleTxBlockRootRollupInputs {
    const reader = BufferReader.asReader(buffer);
    return new SingleTxBlockRootRollupInputs(
      [reader.readObject(PreviousRollupData)],
      reader.readObject(BlockRootRollupData),
    );
  }

  /**
   * Deserializes the inputs from a hex string.
   * @param str - A hex string to deserialize from.
   * @returns A new RootRollupInputs instance.
   */
  static fromString(str: string) {
    return SingleTxBlockRootRollupInputs.fromBuffer(hexToBuffer(str));
  }

  /** Returns a buffer representation for JSON serialization. */
  toJSON() {
    return this.toBuffer();
  }

  /** Creates an instance from a hex string. */
  static get schema() {
    return bufferSchemaFor(SingleTxBlockRootRollupInputs);
  }
}
