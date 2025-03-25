/** @module Interface adobe:cai/types@0.1.0 **/
import type { InputStream as WasiInputStream } from "./wasi-io-streams.js";
export { WasiInputStream };
import type { OutputStream as WasiOutputStream } from "./wasi-io-streams.js";
export { WasiOutputStream };
export type Descriptor = import("./wasi-filesystem-types.js").Descriptor;
export type Error =
  | ErrorAssertion
  | ErrorAssertionNotFound
  | ErrorBadParam
  | ErrorDecoding
  | ErrorEncoding
  | ErrorFileNotFound
  | ErrorIo
  | ErrorJson
  | ErrorManifest
  | ErrorManifestNotFound
  | ErrorNotSupported
  | ErrorOther
  | ErrorRawSigner
  | ErrorRemoteManifest
  | ErrorResourceNotFound
  | ErrorRwLock
  | ErrorSignature
  | ErrorVerify;
export interface ErrorAssertion {
  tag: "assertion";
  val: string;
}
export interface ErrorAssertionNotFound {
  tag: "assertion-not-found";
  val: string;
}
export interface ErrorBadParam {
  tag: "bad-param";
  val: string;
}
export interface ErrorDecoding {
  tag: "decoding";
  val: string;
}
export interface ErrorEncoding {
  tag: "encoding";
  val: string;
}
export interface ErrorFileNotFound {
  tag: "file-not-found";
  val: string;
}
export interface ErrorIo {
  tag: "io";
  val: string;
}
export interface ErrorJson {
  tag: "json";
  val: string;
}
export interface ErrorManifest {
  tag: "manifest";
  val: string;
}
export interface ErrorManifestNotFound {
  tag: "manifest-not-found";
  val: string;
}
export interface ErrorNotSupported {
  tag: "not-supported";
  val: string;
}
export interface ErrorOther {
  tag: "other";
  val: string;
}
export interface ErrorRawSigner {
  tag: "raw-signer";
  val: string;
}
export interface ErrorRemoteManifest {
  tag: "remote-manifest";
  val: string;
}
export interface ErrorResourceNotFound {
  tag: "resource-not-found";
  val: string;
}
export interface ErrorRwLock {
  tag: "rw-lock";
}
export interface ErrorSignature {
  tag: "signature";
  val: string;
}
export interface ErrorVerify {
  tag: "verify";
  val: string;
}
export type Input = InputFile | InputStream;
export interface InputFile {
  tag: "file";
  val: Descriptor;
}
export interface InputStream {
  tag: "stream";
  val: WasiInputStream;
}
export type Output = OutputFile | OutputStream;
export interface OutputFile {
  tag: "file";
  val: Descriptor;
}
export interface OutputStream {
  tag: "stream";
  val: WasiOutputStream;
}
export type SigningAlgorithm =
  | SigningAlgorithmPs256
  | SigningAlgorithmPs384
  | SigningAlgorithmPs512
  | SigningAlgorithmEd25519
  | SigningAlgorithmEs256
  | SigningAlgorithmEs384;
export interface SigningAlgorithmPs256 {
  tag: "ps256";
}
export interface SigningAlgorithmPs384 {
  tag: "ps384";
}
export interface SigningAlgorithmPs512 {
  tag: "ps512";
}
export interface SigningAlgorithmEd25519 {
  tag: "ed25519";
}
export interface SigningAlgorithmEs256 {
  tag: "es256";
}
export interface SigningAlgorithmEs384 {
  tag: "es384";
}
export type AssertionType = AssertionTypeJson | AssertionTypeCbor;
export interface AssertionTypeJson {
  tag: "json";
}
export interface AssertionTypeCbor {
  tag: "cbor";
}
export interface SignerConfig {
  alg: SigningAlgorithm;
  signCert: Uint8Array;
  reserveSize: bigint;
  tsUrl?: string;
}
export interface HashedUri {
  url: string;
  alg?: string;
  hash: Uint8Array;
  salt?: Uint8Array;
}
export interface AssetType {
  type: string;
  version?: string;
}
export interface ResourceRef {
  format: string;
  identifier: string;
  dataTypes?: Array<AssetType>;
  alg?: string;
  hash?: Uint8Array;
}
export type UriOrResource = UriOrResourceHashedUri | UriOrResourceResourceRef;
export interface UriOrResourceHashedUri {
  tag: "hashed-uri";
  val: HashedUri;
}
export interface UriOrResourceResourceRef {
  tag: "resource-ref";
  val: ResourceRef;
}
export interface ClaimGeneratorInfo {
  name: string;
  version?: string;
  icon?: UriOrResource;
  operatingSystem?: string;
  other: Array<[string, string]>;
}
export interface ReviewRating {
  explanation: string;
  code?: string;
  value: number;
}
export interface Coordinate {
  x: number;
  y: number;
}
export type ShapeType = ShapeTypeRectangle | ShapeTypeCircle | ShapeTypePolygon;
export interface ShapeTypeRectangle {
  tag: "rectangle";
}
export interface ShapeTypeCircle {
  tag: "circle";
}
export interface ShapeTypePolygon {
  tag: "polygon";
}
export type UnitType = UnitTypePixel | UnitTypePercent;
export interface UnitTypePixel {
  tag: "pixel";
}
export interface UnitTypePercent {
  tag: "percent";
}
export interface Shape {
  shapeType: ShapeType;
  unit: UnitType;
  origin: Coordinate;
  width?: number;
  height?: number;
  inside?: boolean;
  vertices?: Array<Coordinate>;
}
export type TimeType = TimeTypeNpt;
export interface TimeTypeNpt {
  tag: "npt";
}
export interface Time {
  timeType: TimeType;
  start?: string;
  end?: string;
}
export interface Frame {
  start?: number;
  end?: number;
}
export interface TextSelector {
  fragment: string;
  start?: number;
  end?: number;
}
export interface TextSelectorRange {
  selector: TextSelector;
  end?: TextSelector;
}
export interface Text {
  selectors: Array<TextSelectorRange>;
}
export interface Item {
  identifier: string;
  value: string;
}
export type RangeType =
  | RangeTypeSpatial
  | RangeTypeTemporal
  | RangeTypeFrame
  | RangeTypeTextual
  | RangeTypeIdentified;
export interface RangeTypeSpatial {
  tag: "spatial";
}
export interface RangeTypeTemporal {
  tag: "temporal";
}
export interface RangeTypeFrame {
  tag: "frame";
}
export interface RangeTypeTextual {
  tag: "textual";
}
export interface RangeTypeIdentified {
  tag: "identified";
}
export interface Range {
  rangeType: RangeType;
  shape?: Shape;
  time?: Time;
  frame?: Frame;
  text?: Text;
  item?: Item;
}
export type Role =
  | RoleAreaOfInterest
  | RoleCropped
  | RoleEdited
  | RolePlaced
  | RoleRedacted
  | RoleSubjectArea
  | RoleDeleted
  | RoleStyled
  | RoleWatermarked;
export interface RoleAreaOfInterest {
  tag: "area-of-interest";
}
export interface RoleCropped {
  tag: "cropped";
}
export interface RoleEdited {
  tag: "edited";
}
export interface RolePlaced {
  tag: "placed";
}
export interface RoleRedacted {
  tag: "redacted";
}
export interface RoleSubjectArea {
  tag: "subject-area";
}
export interface RoleDeleted {
  tag: "deleted";
}
export interface RoleStyled {
  tag: "styled";
}
export interface RoleWatermarked {
  tag: "watermarked";
}
export interface RegionOfInterest {
  region: Array<Range>;
  name?: string;
  identifier?: string;
  regionType?: string;
  role?: Role;
  description?: string;
  metadata?: string;
}
export type Relationship =
  | RelationshipParentOf
  | RelationshipComponentOf
  | RelationshipInputTo;
export interface RelationshipParentOf {
  tag: "parent-of";
}
export interface RelationshipComponentOf {
  tag: "component-of";
}
export interface RelationshipInputTo {
  tag: "input-to";
}
export type LogKind = LogKindSuccess | LogKindInformational | LogKindFailure;
export interface LogKindSuccess {
  tag: "success";
}
export interface LogKindInformational {
  tag: "informational";
}
export interface LogKindFailure {
  tag: "failure";
}
export interface ValidationStatus {
  code: string;
  url?: string;
  explanation?: string;
  success?: boolean;
  kind: LogKind;
  ingredientUri?: string;
}
export interface StatusCodes {
  success: Array<ValidationStatus>;
  informational: Array<ValidationStatus>;
  failure: Array<ValidationStatus>;
}
export interface IngredientDeltaValidationResult {
  ingredientAssertionUri: string;
  validationDeltas: StatusCodes;
}
export interface ValidationResults {
  activeManifest?: StatusCodes;
  ingredientDeltas?: Array<IngredientDeltaValidationResult>;
}
export interface ResourceStore {
  resources: Array<[string, Uint8Array]>;
  basePath?: string;
  label?: string;
}
export type AssertionData = AssertionDataCbor | AssertionDataJson;
export interface AssertionDataCbor {
  tag: "cbor";
}
export interface AssertionDataJson {
  tag: "json";
}
export interface AssertionDefinition {
  label: string;
  data: AssertionData;
}
export interface Actor {
  identifier?: string;
  credentials?: Array<HashedUri>;
}
export interface DataSource {
  sourceType: string;
  details?: string;
  actors?: Array<Actor>;
}
export interface Metadata {
  reviews?: Array<ReviewRating>;
  dateTime?: string;
  reference?: HashedUri;
  dataSource?: DataSource;
  regionOfInterest?: RegionOfInterest;
  other: Array<[string, string]>;
}
export interface Ingredient {
  title?: string;
  format?: string;
  documentId?: string;
  instanceId?: string;
  provenance?: string;
  thumbnail?: ResourceRef;
  hash?: string;
  relationship: Relationship;
  activeManifest?: string;
  validationStatus?: Array<ValidationStatus>;
  validationResults?: ValidationResults;
  data?: ResourceRef;
  description?: string;
  informationalUri?: string;
  metadata?: Metadata;
  dataTypes?: Array<AssetType>;
  manifestData?: ResourceRef;
  resources: ResourceStore;
}
export interface ManifestDefinition {
  claimVersion?: number;
  vendor?: string;
  claimGeneratorInfo: Array<ClaimGeneratorInfo>;
  metadata?: Array<Metadata>;
  title?: string;
  format: string;
  instanceId: string;
  thumbnail?: ResourceRef;
  ingredients: Array<Ingredient>;
  assertions: Array<AssertionDefinition>;
  redactions?: Array<string>;
  label?: string;
}
export interface ManifestFile {
  manifest: ManifestDefinition;
  ingredients?: Array<string>;
}
