import { get } from '../utils/https';

export function getBook({ id }) {
  return get(`/book/${id}`);
}
