import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Injectable, provideZonelessChangeDetection } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ApiResponse, PaginatedResponse } from './types';
import { environment } from '@environments/environment';

/**
 * Interface test cho Employee
 */
interface TestEmployee {
  id: string;
  name: string;
  email: string;
}

/**
 * Concrete implementation của BaseApiService để test
 * BaseApiService là abstract nên cần tạo class cụ thể
 */
@Injectable()
class TestApiService extends BaseApiService {
  protected readonly baseUrl = '/employees';

  /**
   * Expose protected methods để test
   */
  public testGetAll() {
    return this.getAll<TestEmployee>();
  }

  public testGetPaginated(page?: number, pageSize?: number) {
    const params = this.buildParams({ page, pageSize });
    return this.getPaginated<TestEmployee>(params);
  }

  public testGetById(id: string) {
    return this.getById<TestEmployee>(id);
  }

  public testCreate(data: Partial<TestEmployee>) {
    return this.create<TestEmployee>(data);
  }

  public testUpdate(id: string, data: Partial<TestEmployee>) {
    return this.update<TestEmployee>(id, data);
  }

  public testDelete(id: string) {
    return this.delete(id);
  }

  public testBuildParams(params: Record<string, unknown>) {
    return this.buildParams(params as Parameters<typeof this.buildParams>[0]);
  }

  public getFullUrl() {
    return this.fullUrl;
  }
}

describe('BaseApiService', () => {
  let service: TestApiService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        TestApiService
      ]
    });

    service = TestBed.inject(TestApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('URL Construction', () => {
    it('should construct fullUrl correctly', () => {
      expect(service.getFullUrl()).toBe(`${apiUrl}/employees`);
    });
  });

  describe('getAll', () => {
    it('should make GET request to base URL', () => {
      const mockResponse: ApiResponse<TestEmployee[]> = {
        success: true,
        data: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Doe', email: 'jane@example.com' }
        ]
      };

      service.testGetAll().subscribe(response => {
        expect(response.success).toBeTrue();
        expect(response.data.length).toBe(2);
        expect(response.data[0].name).toBe('John Doe');
      });

      const req = httpMock.expectOne(`${apiUrl}/employees`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getPaginated', () => {
    it('should make GET request with pagination params', () => {
      const mockResponse: ApiResponse<PaginatedResponse<TestEmployee>> = {
        success: true,
        data: {
          data: [{ id: '1', name: 'John Doe', email: 'john@example.com' }],
          total: 100,
          page: 1,
          pageSize: 10,
          totalPages: 10
        }
      };

      service.testGetPaginated(1, 10).subscribe(response => {
        expect(response.success).toBeTrue();
        expect(response.data.total).toBe(100);
        expect(response.data.page).toBe(1);
        expect(response.data.pageSize).toBe(10);
      });

      const req = httpMock.expectOne(`${apiUrl}/employees?page=1&pageSize=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getById', () => {
    it('should make GET request with ID in URL', () => {
      const mockResponse: ApiResponse<TestEmployee> = {
        success: true,
        data: { id: '123', name: 'John Doe', email: 'john@example.com' }
      };

      service.testGetById('123').subscribe(response => {
        expect(response.success).toBeTrue();
        expect(response.data.id).toBe('123');
        expect(response.data.name).toBe('John Doe');
      });

      const req = httpMock.expectOne(`${apiUrl}/employees/123`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('create', () => {
    it('should make POST request with data', () => {
      const newEmployee: Partial<TestEmployee> = {
        name: 'New Employee',
        email: 'new@example.com'
      };

      const mockResponse: ApiResponse<TestEmployee> = {
        success: true,
        data: { id: '999', name: 'New Employee', email: 'new@example.com' }
      };

      service.testCreate(newEmployee).subscribe(response => {
        expect(response.success).toBeTrue();
        expect(response.data.id).toBe('999');
        expect(response.data.name).toBe('New Employee');
      });

      const req = httpMock.expectOne(`${apiUrl}/employees`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newEmployee);
      req.flush(mockResponse);
    });
  });

  describe('update', () => {
    it('should make PUT request with ID and data', () => {
      const updateData: Partial<TestEmployee> = {
        name: 'Updated Name'
      };

      const mockResponse: ApiResponse<TestEmployee> = {
        success: true,
        data: { id: '123', name: 'Updated Name', email: 'john@example.com' }
      };

      service.testUpdate('123', updateData).subscribe(response => {
        expect(response.success).toBeTrue();
        expect(response.data.name).toBe('Updated Name');
      });

      const req = httpMock.expectOne(`${apiUrl}/employees/123`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateData);
      req.flush(mockResponse);
    });
  });

  describe('delete', () => {
    it('should make DELETE request with ID', () => {
      const mockResponse: ApiResponse<void> = {
        success: true,
        data: undefined as unknown as void
      };

      service.testDelete('123').subscribe(response => {
        expect(response.success).toBeTrue();
      });

      const req = httpMock.expectOne(`${apiUrl}/employees/123`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('buildParams', () => {
    it('should build HttpParams from object', () => {
      const params = service.testBuildParams({
        page: 1,
        pageSize: 10,
        sortBy: 'name'
      });

      expect(params.get('page')).toBe('1');
      expect(params.get('pageSize')).toBe('10');
      expect(params.get('sortBy')).toBe('name');
    });

    it('should exclude undefined values', () => {
      const params = service.testBuildParams({
        page: 1,
        pageSize: undefined
      });

      expect(params.get('page')).toBe('1');
      expect(params.has('pageSize')).toBeFalse();
    });

    it('should exclude null values', () => {
      const params = service.testBuildParams({
        page: 1,
        pageSize: null
      });

      expect(params.get('page')).toBe('1');
      expect(params.has('pageSize')).toBeFalse();
    });

    it('should exclude empty string values', () => {
      const params = service.testBuildParams({
        page: 1,
        search: ''
      });

      expect(params.get('page')).toBe('1');
      expect(params.has('search')).toBeFalse();
    });

    it('should handle empty params object', () => {
      const params = service.testBuildParams({});
      expect(params.keys().length).toBe(0);
    });

    it('should handle undefined params', () => {
      const params = service.testBuildParams(undefined as unknown as Record<string, unknown>);
      expect(params.keys().length).toBe(0);
    });
  });
});
