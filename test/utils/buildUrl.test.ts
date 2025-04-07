import { buildUrl } from '../../src/utils/buildUrl';
import { QueryParams } from '../../src/types/utilsAppTypes';


describe('buildUrl', () => {
  const baseUrl = 'https://api.example.com';

  test('builds a basic URL with no parameters', () => {
    const params: QueryParams = {};
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/');
  });

  test('adds resource to the path', () => {
    const params: QueryParams = { resource: 'users' };
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/users');
  });

  test('adds query parameters correctly', () => {
    const params: QueryParams = {
      page: 1,
      limit: 10,
      filter: 'active'
    };
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/?page=1&limit=10&filter=active');
  });

  test('handles resource and query parameters together', () => {
    const params: QueryParams = {
      resource: 'posts',
      page: 2,
      limit: 5
    };
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/posts?page=2&limit=5');
  });

  test('ignores undefined values', () => {
    const params: QueryParams = {
      page: 1,
      limit: undefined,
      filter: ''
    };
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/?page=1');
  });

  test('handles custom parameters', () => {
    const params: QueryParams = {
      resource: 'products',
      sort: 'price',
      direction: 'asc'
    };
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/products?sort=price&direction=asc');
  });

  test('handles numeric and string values correctly', () => {
    const params: QueryParams = {
      page: 1,
      status: 'active',
      count: 0
    };
    const result = buildUrl(baseUrl, params);
    expect(result).toBe('https://api.example.com/?page=1&status=active&count=0');
  });

  test('handles trailing slash in baseUrl', () => {
    const trailingSlashUrl = 'https://api.example.com/';
    const params: QueryParams = { resource: 'users' };
    const result = buildUrl(trailingSlashUrl, params);
    expect(result).toBe('https://api.example.com/users');
  });
});