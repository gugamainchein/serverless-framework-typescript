import { CustomServerless, ServerlessFunction } from '../types/serverless-plugin.types';
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
declare const _default: (serverless: CustomServerless) => PartialRecord<'swaggerUI' | 'swaggerJSON' | 'swaggerRedirectURI', ServerlessFunction>;
export default _default;
