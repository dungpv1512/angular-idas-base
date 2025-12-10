import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

export interface ToChuc {
  Id: number;
  TenToChuc: string;
  MaToChuc: string;
  Stt: string;
  SttSort: string;
  IdToChucCapTren: number | null;
  DuongDanSapXep: string;
  Loai: number;
  TrangThai: number;
  TinhTrang: number;
  LaCongTyMe: boolean;
  NoiDungChucNangNhiemVus: string[];
  ChucDanh_NhanSus: Array<{ Id: number }>;
  TenNhanSu: string | null;
  DateCreated: string;
  DateUpdated: string;
  IdCreated: number;
  IdUpdated: number;
  PhienBan: number;
  NoiDungChinhSua: string;
}

export interface ToChucResponse {
  StatusCode: number;
  Success: boolean;
  Data: ToChuc[];
  Total: number;
  Take: number;
  Page: number;
}

export interface ToChucFilter {
  take?: number;
  skip?: number;
  page?: number;
  pageSize?: number;
  all?: boolean;
  filter?: any;
  sort?: any[];
  fields?: string;
  UseCache?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToChucService {
  private http = inject(HttpClient);
  private apiUrl = 'https://apidemo.idasonline.com/organizations-gateway/api/tochuc';

  /**
   * Lấy danh sách tổ chức với filter
   */
  getList(filter: ToChucFilter = {}): Observable<ToChucResponse> {
    const defaultFilter: ToChucFilter = {
      take: 20,
      skip: 0,
      page: 1,
      pageSize: 20,
      all: true,
      filter: {
        logic: 'and',
        filters: [
          {
            logic: 'and',
            filters: [
              { field: 'TrangThai', operator: 'notinlist', value: [6, 8, 9] }
            ]
          }
        ]
      },
      sort: [{ field: 'SttSort' }],
      fields: 'new (DateCreated, DateUpdated, IdUpdated, IdToChucCapTren, DuongDanSapXep, Id, IdCreated, LaCongTyMe, Loai, MaToChuc, NoiDungChinhSua, PhienBan, Stt, ToChuc_ChucDanhs.SelectMany(x => x.ChucDanh_NhanSus.Select(y => new{ y.NhanSu.Id })) as ChucDanh_NhanSus, SttSort, TenToChuc, TinhTrang, TrangThai, ChucNangNhiemVus.Where(x => x.Type == 1).Select(x => x.MoTa) as NoiDungChucNangNhiemVus)',
      UseCache: true
    };

    const requestBody = { ...defaultFilter, ...filter };

    return this.http.post<ToChucResponse>(`${this.apiUrl}/DefaultFilters`, requestBody);
  }

  /**
   * Lấy chi tiết tổ chức theo ID
   */
  getById(id: number): Observable<ToChuc> {
    return this.http.get<{ Data: ToChuc }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.Data)
    );
  }

  /**
   * Tạo mới tổ chức
   */
  create(data: Partial<ToChuc>): Observable<ToChuc> {
    return this.http.post<{ Data: ToChuc }>(this.apiUrl, data).pipe(
      map(response => response.Data)
    );
  }

  /**
   * Cập nhật tổ chức
   */
  update(id: number, data: Partial<ToChuc>): Observable<ToChuc> {
    return this.http.put<{ Data: ToChuc }>(`${this.apiUrl}/${id}`, data).pipe(
      map(response => response.Data)
    );
  }

  /**
   * Xóa tổ chức
   */
  delete(id: number): Observable<boolean> {
    return this.http.delete<{ Success: boolean }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.Success)
    );
  }

  /**
   * Convert danh sách tổ chức thành tree data
   */
  convertToTreeData(data: ToChuc[]): any[] {
    const map = new Map<number, any>();
    const roots: any[] = [];

    // Tạo map của tất cả nodes
    data.forEach(item => {
      map.set(item.Id, {
        key: item.Id.toString(),
        title: item.TenToChuc,
        value: item.Id,
        isLeaf: false,
        expanded: false,
        data: item,
        children: []
      });
    });

    // Xây dựng tree structure
    data.forEach(item => {
      const node = map.get(item.Id);
      if (item.IdToChucCapTren && map.has(item.IdToChucCapTren)) {
        const parent = map.get(item.IdToChucCapTren);
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  /**
   * Convert danh sách tổ chức thành tree table data
   */
  convertToTreeTableData(data: ToChuc[], level = 0): any[] {
    const map = new Map<number, any>();
    const roots: any[] = [];

    // Tạo map của tất cả nodes
    data.forEach(item => {
      map.set(item.Id, {
        key: item.Id.toString(),
        data: item,
        level: 0,
        expand: false,
        children: []
      });
    });

    // Xây dựng tree structure và set level
    const setLevel = (node: any, lvl: number) => {
      node.level = lvl;
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => setLevel(child, lvl + 1));
      }
    };

    data.forEach(item => {
      const node = map.get(item.Id);
      if (item.IdToChucCapTren && map.has(item.IdToChucCapTren)) {
        const parent = map.get(item.IdToChucCapTren);
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    // Set level cho tất cả nodes
    roots.forEach(root => setLevel(root, 0));

    return roots;
  }
}
