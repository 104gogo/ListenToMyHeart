import { get } from '../utils/http';

// 获取小说源列表
export function getBookSources(id) {
  return get(`/bookSources?book=${id}`);
}

// 获取小说章节列表
export function getChapters(sourceId) {
  return get(`/chapters/${sourceId}`);
}

// 获取小说章节内容
export function getChapter(link) {
  return get(`/chapter/${link}`);
}

// 获取小说章节内容
export function getMp3Url(text) {
  return get('/story', { text });
}
