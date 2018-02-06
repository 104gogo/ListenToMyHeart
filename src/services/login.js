import { get } from '../utils/https';
import { getCode } from '../../mock/login';

export function getVerifiableCode() {
  return get(getCode());
}
