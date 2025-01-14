// GENERATED FILE - DO NOT EDIT, RUN yarn remake-constants in circuits.js
#pragma once

#define MAX_NOTE_HASHES_PER_CALL 16
#define MAX_NULLIFIERS_PER_CALL 16
#define MAX_PUBLIC_CALL_STACK_LENGTH_PER_CALL 16
#define MAX_L2_TO_L1_MSGS_PER_CALL 2
#define MAX_PUBLIC_DATA_UPDATE_REQUESTS_PER_CALL 32
#define MAX_PUBLIC_DATA_READS_PER_CALL 32
#define MAX_NOTE_HASH_READ_REQUESTS_PER_CALL 16
#define MAX_NULLIFIER_READ_REQUESTS_PER_CALL 16
#define MAX_NULLIFIER_NON_EXISTENT_READ_REQUESTS_PER_CALL 16
#define MAX_L1_TO_L2_MSG_READ_REQUESTS_PER_CALL 16
#define MAX_UNENCRYPTED_LOGS_PER_CALL 4
#define AZTEC_ADDRESS_LENGTH 1
#define GAS_FEES_LENGTH 2
#define GAS_LENGTH 2
#define CALL_CONTEXT_LENGTH 6
#define CONTENT_COMMITMENT_LENGTH 4
#define CONTRACT_STORAGE_READ_LENGTH 3
#define CONTRACT_STORAGE_UPDATE_REQUEST_LENGTH 3
#define GLOBAL_VARIABLES_LENGTH 8
#define APPEND_ONLY_TREE_SNAPSHOT_LENGTH 2
#define L2_TO_L1_MESSAGE_LENGTH 3
#define PARTIAL_STATE_REFERENCE_LENGTH 6
#define READ_REQUEST_LENGTH 2
#define LOG_HASH_LENGTH 3
#define NOTE_HASH_LENGTH 2
#define NULLIFIER_LENGTH 3
#define STATE_REFERENCE_LENGTH 8
#define TOTAL_FEES_LENGTH 1
#define HEADER_LENGTH 23
#define PUBLIC_CIRCUIT_PUBLIC_INPUTS_LENGTH 482
#define PUBLIC_CONTEXT_INPUTS_LENGTH 41
#define SENDER_SELECTOR 0
#define ADDRESS_SELECTOR 1
#define STORAGE_ADDRESS_SELECTOR 1
#define FUNCTION_SELECTOR_SELECTOR 2
#define START_GLOBAL_VARIABLES 29
#define CHAIN_ID_SELECTOR 29
#define VERSION_SELECTOR 30
#define BLOCK_NUMBER_SELECTOR 31
#define TIMESTAMP_SELECTOR 32
#define COINBASE_SELECTOR 33
#define FEE_PER_DA_GAS_SELECTOR 35
#define FEE_PER_L2_GAS_SELECTOR 36
#define END_GLOBAL_VARIABLES 37
#define START_SIDE_EFFECT_COUNTER 37
#define TRANSACTION_FEE_SELECTOR 40
#define START_NOTE_HASH_EXISTS_WRITE_OFFSET 0
#define START_NULLIFIER_EXISTS_OFFSET 16
#define START_NULLIFIER_NON_EXISTS_OFFSET 32
#define START_L1_TO_L2_MSG_EXISTS_WRITE_OFFSET 48
#define START_SSTORE_WRITE_OFFSET 64
#define START_SLOAD_WRITE_OFFSET 96
#define START_EMIT_NOTE_HASH_WRITE_OFFSET 128
#define START_EMIT_NULLIFIER_WRITE_OFFSET 144
#define START_EMIT_L2_TO_L1_MSG_WRITE_OFFSET 160
#define START_EMIT_UNENCRYPTED_LOG_WRITE_OFFSET 162
