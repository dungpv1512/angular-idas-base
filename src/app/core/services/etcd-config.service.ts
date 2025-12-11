import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * ETCD Config Service
 * Service để lấy config từ ETCD server
 */

export interface ETCDResponse {
  node: {
    createdIndex: number;
    dir: boolean;
    key: string;
    modifiedIndex: number;
    ttl: number;
    value: string;
  };
}

export interface ETCDConfig {
  AppConfig: {
    WebAppName: string;
  };
  GlobalAPIConfig: {
    [key: string]: string;
  };
  RabbitMQConfig: {
    VirtualHost: string;
    ConnectionString: string;
  };
  DistributedCacheConfig: {
    Enabled: boolean;
    ConnectionString: string;
  };
  DistributedLockConfig: {
    Enabled: boolean;
    ConnectionString: string;
  };
  IdentityClientConfig: {
    Enabled: boolean;
    Authority: string;
  };
  CommonISOConfig: {
    UseOnlyOffice: boolean;
  };
  BieuMauConfig: {
    EnableBieuMauDong: boolean;
  };
  MenuConfig: {
    MenuISO: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EtcdConfigService {
  private etcdUrl = 'http://192.168.100.108:2383/v3/get';
  private configKey = '/Development/Profiles/dung.pham.demo/Constants/Install';

  constructor(private http: HttpClient) {}

  /**
   * Lấy config từ ETCD
   */
  getConfig(): Observable<ETCDConfig> {
    const url = `${this.etcdUrl}?key=${encodeURIComponent(this.configKey)}`;
    
    return this.http.get<ETCDResponse>(url).pipe(
      map(response => {
        const config = JSON.parse(response.node.value);
        return config as ETCDConfig;
      })
    );
  }

  /**
   * Lấy API endpoints từ GlobalAPIConfig
   */
  getApiEndpoints(): Observable<{ [key: string]: string }> {
    return this.getConfig().pipe(
      map(config => config.GlobalAPIConfig)
    );
  }

  /**
   * Lấy một API endpoint cụ thể
   */
  getApiEndpoint(serviceName: string): Observable<string> {
    return this.getApiEndpoints().pipe(
      map(endpoints => endpoints[serviceName] || '')
    );
  }
}
