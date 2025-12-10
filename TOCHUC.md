# API Endpoint
  
  https://apidemo.idasonline.com/organizations-gateway/api/tochuc/DefaultFilters

# API Token

  Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkZEODYxQTM0NEFBOTI4M0IyRjg1RkE1QzcyRTcxMjBCRTM0RTUwMzVSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6Il9ZWWFORXFwS0RzdmhmcGNjdWNTQy1OT1VEVSJ9.eyJuYmYiOjE3NjUzNDE3MTAsImV4cCI6MTc2NTM0NTMxMCwiaXNzIjoiaHR0cHM6Ly9zc29kZW1vLmlkYXNvbmxpbmUuY29tIiwiYXVkIjoiY29tbW9ucy5hcGkiLCJjbGllbnRfaWQiOiJ3ZWJjbGllbnRwcm9kdWN0X2h5YnJpZF9jbGllbnRjcmVkZW50aWFscyIsInN1YiI6IjEzNjYiLCJhdXRoX3RpbWUiOjE3NjUyNDk4NzgsImlkcCI6ImxvY2FsIiwiSXNTdXBlckFkbWluIjoiVHJ1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTM2NiIsIlVzZXJOYW1lIjoiZHVuZ3B2MTUxMkBnbWFpbC5jb20iLCJVc2VySWQiOiIxMzY2IiwianRpIjoiRjdBQjg3OTlBRUI3OEFBODQ5RTM0RDhFMDlGQkNEMDIiLCJzaWQiOiJGMkMxMjdCN0NDNEQ2Q0I4NThENThEMTUyNjc5OEYyNiIsImlhdCI6MTc2NTM0MTcxMCwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInNoYXJlZC5zY29wZSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.of_G1jYxJCkYSXPELSW9fUdfosvq8wXJPGX__sZK72BxBVnYgMQ2JngNMEXwBop1QbzUEk6bbpuzg8WPwfFjXP4mheMPfHG1Xc7AlCKvnkPVzU416UXLDBjfQPPB_doFONsXyXUSYZlAGhnXpXIHp1LDsGZdZ8oBislR8Nq7Py_28mxvEDVtbrCHUhN6nsb_omRvtjVcS64zTtWsR6RBvssHriuLXNkJUcaSF9QRRdCJ_ZaXHlmUSD56NaI7OUb7ip7BsWTIoY3D9PrGyxv1demCJR8eTUtdNtAAM8P-ZFyuyV5s6NlO587Ywxy9ezHPKOTEh93YNS7Pcu6ugy_C7xc2PcEklUCD2OiWiKxl4YVu5wuYxUwg_Cm3DnnB5sGikKlSstR61VKIZi0V0Jojhp9YVPWxmyUFZ58MiyNRYWdmNulGrGAFb7SY1U0FD2zzrn_DraS4ouBJKYs43vVJ4tI3ks0ZkX48AmMYznAYAsnz6VmzPDH_dYe2dW1fRlbOcw7NtIPUg3xdyeiAji2GrT8hayZulLUwALY_QVWgynXPc9qjZVJ2iXMpW6trbOHPLFbXhLtqmQqhMo3noAIHByudQrODjGWCC7C9-K51PB-D2UpNKWldlkc4hzUREKykzrhsE2L6OO0-ekOw4uKsxzQDK4Ti8G1g_8yYSVWJOHo

# Request API

{"take":20,"skip":0,"page":1,"pageSize":20,"all":true,"filter":{"logic":"and","filters":[{"logic":"and","filters":[{"field":"TrangThai","operator":"notinlist","value":[6,8,9]}]}]},"DistributedConfigs":[{"ServiceCode":"Organizations","EntityName":"NhanSu","RefField":"IdUpdated","RefByField":"IdUser","Fields":[{"Field":"TenNhanSu","1Alias":"TenNhanSuAlias1","EnumType":"string"}]}],"sort":[{"field":"SttSort"}],"fields":"new (DateCreated, DateUpdated, IdUpdated, IdToChucCapTren, DuongDanSapXep, Id, IdCreated, LaCongTyMe\n                         , LaCongTyMe, Loai, MaToChuc, NoiDungChinhSua, PhienBan,Stt, ToChuc_ChucDanhs.SelectMany(x => x.ChucDanh_NhanSus.Select(y => new{ y.NhanSu.Id })) as ChucDanh_NhanSus\n                         ,SttSort,TenToChuc,TinhTrang,TrangThai,ChucNangNhiemVus.Where(x => x.Type == 1).Select(x => x.MoTa) as NoiDungChucNangNhiemVus)","UseCache":true}

# Response API 

{
    "StatusCode": 200,
    "Success": true,
    "Data": [
        {
            "DateCreated": "2023-12-12T06:13:54.948135",
            "DateUpdated": "2023-12-12T06:13:55.073949",
            "IdUpdated": 24,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",2673,",
            "Id": 2673,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001",
            "TenToChuc": "Công ty TNHH Tư Vấn Chất lượng và Phát Triển Công Nghệ",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-03-03T02:14:11.613399",
            "DateUpdated": "2025-03-03T12:59:00.202534",
            "IdUpdated": 1343,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,5683,",
            "Id": 5683,
            "IdCreated": 1350,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".1",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00001",
            "TenToChuc": "Ban giám đốc Công ty",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": null
        },
        {
            "DateCreated": "2025-12-03T02:09:38.103963",
            "DateUpdated": "2025-12-03T02:09:41.885326",
            "IdUpdated": 2382,
            "IdToChucCapTren": 5683,
            "DuongDanSapXep": ",2673,5683,7732,",
            "Id": 7732,
            "IdCreated": 2382,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "11111111111111111",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.1.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00001.00001",
            "TenToChuc": "Phòng giám đốc",
            "TinhTrang": 1,
            "TrangThai": 4,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Tester 01"
        },
        {
            "DateCreated": "2025-12-03T02:19:49.558715",
            "DateUpdated": "2025-12-03T02:19:49.756133",
            "IdUpdated": 2382,
            "IdToChucCapTren": 5683,
            "DuongDanSapXep": ",2673,5683,7734,",
            "Id": 7734,
            "IdCreated": 2382,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-15",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.1.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00001.00002",
            "TenToChuc": "TC-15",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Tester 01"
        },
        {
            "DateCreated": "2025-12-03T02:21:16.969696",
            "DateUpdated": "2025-12-03T02:21:17.112147",
            "IdUpdated": 2382,
            "IdToChucCapTren": 5683,
            "DuongDanSapXep": ",2673,5683,7735,",
            "Id": 7735,
            "IdCreated": 2382,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-16",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.1.3",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00001.00003",
            "TenToChuc": "TC-16",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Tester 01"
        },
        {
            "DateCreated": "2025-12-03T03:03:13.996965",
            "DateUpdated": "2025-12-03T03:03:14.176683",
            "IdUpdated": 2382,
            "IdToChucCapTren": 7735,
            "DuongDanSapXep": ",2673,5683,7735,7736,",
            "Id": 7736,
            "IdCreated": 2382,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-17",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.1.3.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00001.00003.00001",
            "TenToChuc": "TC-17",
            "TinhTrang": 1,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Tester 01"
        },
        {
            "DateCreated": "2025-03-03T06:44:58.681683",
            "DateUpdated": "2025-03-03T06:44:59.003274",
            "IdUpdated": 24,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,5684,",
            "Id": 5684,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".2",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00002",
            "TenToChuc": "Trung tâm Kinh doanh và Marketing",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-14T03:26:49.514585",
            "DateUpdated": "2025-03-03T07:21:34.479337",
            "IdUpdated": 24,
            "IdToChucCapTren": 5684,
            "DuongDanSapXep": ",2673,5684,2674,",
            "Id": 2674,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".2.1",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.2.1",
            "ChucDanh_NhanSus": [
                {
                    "Id": 6446
                },
                {
                    "Id": 6449
                },
                {
                    "Id": 10506
                },
                {
                    "Id": 10507
                },
                {
                    "Id": 10508
                },
                {
                    "Id": 10509
                },
                {
                    "Id": 10510
                },
                {
                    "Id": 10511
                },
                {
                    "Id": 10512
                },
                {
                    "Id": 10513
                },
                {
                    "Id": 10516
                },
                {
                    "Id": 11518
                },
                {
                    "Id": 11518
                }
            ],
            "SttSort": "00001.00002.00001",
            "TenToChuc": "Kinh doanh & Phát triển thị trường",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "Giám sát, chịu trách nhiệm về hoạt động sản xuất kinh doanh",
                "1. Xây dựng và thực thi chiến lược\nĐịnh hướng chiến lược phát triển dài hạn và ngắn hạn của doanh nghiệp.\nĐảm bảo các kế hoạch hoạt động phù hợp với tầm nhìn và mục tiêu của công ty.\nTheo dõi và đánh giá hiệu quả thực hiện chiến lược.",
                "2. Quản lý tài chính\nChịu trách nhiệm về kết quả kinh doanh, lợi nhuận và dòng tiền.\nPhê duyệt ngân sách và giám sát việc sử dụng nguồn lực tài chính.\nĐảm bảo doanh nghiệp tuân thủ các quy định pháp luật về tài chính và thuế.",
                "3. Phát triển đội ngũ nhân sự\nLãnh đạo và truyền cảm hứng cho đội ngũ quản lý cấp cao và nhân viên.\nTuyển dụng và duy trì nhân sự tài năng, phù hợp với văn hóa doanh nghiệp.\nĐảm bảo môi trường làm việc thúc đẩy sáng tạo, hợp tác và hiệu suất cao.",
                "4. Quản lý rủi ro và tuân thủ pháp luật\nNhận diện và quản lý các rủi ro kinh doanh, tài chính, pháp lý.\nĐảm bảo doanh nghiệp tuân thủ các quy định của pháp luật và các tiêu chuẩn ngành nghề.",
                "5. Xây dựng và duy trì mối quan hệ\nPhát triển mối quan hệ với các đối tác, khách hàng, nhà đầu tư và cổ đông.\nĐại diện doanh nghiệp trong các sự kiện và hoạt động bên ngoài.\nGiải quyết các vấn đề liên quan đến truyền thông và danh tiếng công ty.",
                "6. Đổi mới và chuyển đổi\nĐưa ra các sáng kiến đổi mới trong sản phẩm, dịch vụ và mô hình kinh doanh.\nLãnh đạo các dự án chuyển đổi số hoặc cải tiến quy trình nhằm tăng cường hiệu quả.",
                "7. Ra quyết định quan trọng\nXử lý các quyết định chiến lược liên quan đến đầu tư, mở rộng hoặc tái cấu trúc.\nĐưa ra các quyết định nhanh chóng và hiệu quả trong các tình huống khẩn cấp."
            ],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-03-03T07:22:28.864246",
            "DateUpdated": "2025-03-03T07:22:29.075498",
            "IdUpdated": 24,
            "IdToChucCapTren": 5684,
            "DuongDanSapXep": ",2673,5684,5685,",
            "Id": 5685,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".2.2",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.2.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00002.00002",
            "TenToChuc": "Marketing & Truyền thông",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-17T13:43:14.910541",
            "DateUpdated": "2025-08-17T13:43:15.33922",
            "IdUpdated": 24,
            "IdToChucCapTren": 5684,
            "DuongDanSapXep": ",2673,5684,6696,",
            "Id": 6696,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".2.3",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.2.3",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00002.00003",
            "TenToChuc": "ThemToChuc",
            "TinhTrang": 1,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-03-03T07:23:37.574608",
            "DateUpdated": "2025-03-03T07:23:37.739616",
            "IdUpdated": 24,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,5686,",
            "Id": 5686,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".3",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.3",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00003",
            "TenToChuc": "Trung tâm Tư vấn và Dịch vụ",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-14T03:27:55.494194",
            "DateUpdated": "2025-03-03T07:26:19.751368",
            "IdUpdated": 24,
            "IdToChucCapTren": 5686,
            "DuongDanSapXep": ",2673,5686,2677,",
            "Id": 2677,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".3.1",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.3.1",
            "ChucDanh_NhanSus": [
                {
                    "Id": 6456
                },
                {
                    "Id": 10503
                },
                {
                    "Id": 10505
                },
                {
                    "Id": 11515
                },
                {
                    "Id": 12523
                },
                {
                    "Id": 11517
                },
                {
                    "Id": 12523
                },
                {
                    "Id": 6459
                },
                {
                    "Id": 6462
                },
                {
                    "Id": 6463
                },
                {
                    "Id": 9489
                },
                {
                    "Id": 9491
                },
                {
                    "Id": 9492
                },
                {
                    "Id": 10504
                },
                {
                    "Id": 11516
                }
            ],
            "SttSort": "00001.00003.00001",
            "TenToChuc": "Tư vấn tiêu chuẩn",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "Quản lý tiền độ của tât cả các dự án tư vấn hệ thống quản lý ISO/ các dự án tư vấn trên nền tảng ISO điện tử; chịu trách nhiệm chất lượng và tiến độ dự án",
                "Tư vấn hệ thống ISO điện tử",
                "Triển khai đào tạo các hệ thống ISO; đào tạo các hệ thống và các phân hệ trên hệ thống ISO điện tử",
                "Triển khai đánh giá, đánh giá nội bộ các hệ thống ISO và triển khai đánh giá trên hệ thống ISO điện tử",
                "Quản lý chung về các hoạt động văn phòng CTTV bao gồm: đón tiếp khách, giải đáp điện thoại, quản lý tài sản, quản lý tài liệu hồ sơ, vệ sinh văn phòng, hệ thống điện và mạng máy tính...",
                "Xem xét và phê duyệt các hoạt động chi văn phòng và giải trình hàng tháng. ",
                "Tham gia công tác tuyển dụng: yêu cầu tuyển dụng, đăng tuyển, trực tiếp sơ tuyển (vòng 1), phổ biến các quy định, đánh giá thử việc, trao đổi các nội dung hợp đồng lao động và học việc với người lao động. ",
                "Tham gia đào tạo nhân viên: đào tạo các quy trình thủ tục hoạt động của CTTV, đào tạo nghiệp vụ tư vấn với nhân viên tham gia tư vấn, đào tạo nghiệp vụ Marketing cho nhân viên Marketing. "
            ],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-14T03:28:20.895831",
            "DateUpdated": "2025-03-03T07:27:30.981599",
            "IdUpdated": 24,
            "IdToChucCapTren": 5686,
            "DuongDanSapXep": ",2673,5686,2678,",
            "Id": 2678,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".3.2",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.3.2",
            "ChucDanh_NhanSus": [
                {
                    "Id": 9494
                },
                {
                    "Id": 9495
                },
                {
                    "Id": 9493
                },
                {
                    "Id": 10514
                },
                {
                    "Id": 10515
                }
            ],
            "SttSort": "00001.00003.00002",
            "TenToChuc": "Triển khai & Hỗ trợ khách hàng",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-03-03T07:24:49.187312",
            "DateUpdated": "2025-03-03T07:24:49.355225",
            "IdUpdated": 24,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,5687,",
            "Id": 5687,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".4",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.4",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00004",
            "TenToChuc": "Trung tâm Công nghệ & Phát triển sản phẩm",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-14T03:50:33.521307",
            "DateUpdated": "2025-03-03T07:28:13.74001",
            "IdUpdated": 24,
            "IdToChucCapTren": 5687,
            "DuongDanSapXep": ",2673,5687,2679,",
            "Id": 2679,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".4.1",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.4.1",
            "ChucDanh_NhanSus": [
                {
                    "Id": 6447
                },
                {
                    "Id": 11519
                },
                {
                    "Id": 6448
                },
                {
                    "Id": 11518
                },
                {
                    "Id": 11521
                },
                {
                    "Id": 12524
                },
                {
                    "Id": 12525
                },
                {
                    "Id": 6449
                },
                {
                    "Id": 6450
                },
                {
                    "Id": 6451
                },
                {
                    "Id": 6455
                },
                {
                    "Id": 8487
                },
                {
                    "Id": 7484
                },
                {
                    "Id": 9501
                },
                {
                    "Id": 9502
                },
                {
                    "Id": 12524
                },
                {
                    "Id": 12525
                },
                {
                    "Id": 10500
                }
            ],
            "SttSort": "00001.00004.00001",
            "TenToChuc": "Phát triển phần mềm",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "Nghiên cứu, xây dựng định hướng chiến lược toàn bộ hệ thống công nghệ thông tin (CNTT) của doanh nghiệp",
                "Tham mưu, tổ chức triển khai và quản lý toàn bộ hệ thống công nghệ thông tin (CNTT) của doanh nghiệp",
                "Quản lý hạ tầng công nghệ thông tin: Cài đặt và duy trì hệ thống máy chủ, mạng. Quản lý cơ sở hạ tầng mạng",
                "Phát triển, xây dựng và fix bug của các phần mềm, ứng dụng ",
                "Quản lý cơ sở dữ liệu, phần cứng và thiết bị IT, đồng thời bảo mật hệ thống an toàn tránh rò rỉ dữ dữ liệu",
                "Hỗ trợ kỹ thuật và người dùng",
                "Thiết kế hệ thống Phần mềm",
                "Tham gia tư vấn dịch vụ tại khách hàng"
            ],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-14T03:50:58.807124",
            "DateUpdated": "2025-03-03T07:31:11.069934",
            "IdUpdated": 24,
            "IdToChucCapTren": 5687,
            "DuongDanSapXep": ",2673,5687,2680,",
            "Id": 2680,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".4.2",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.4.2",
            "ChucDanh_NhanSus": [
                {
                    "Id": 6449
                },
                {
                    "Id": 6453
                },
                {
                    "Id": 6452
                },
                {
                    "Id": 9500
                },
                {
                    "Id": 6454
                },
                {
                    "Id": 8484
                }
            ],
            "SttSort": "00001.00004.00002",
            "TenToChuc": "Trung tâm phân tích nghiệp vụ và kiểm thử",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "Phân tích các yêu cầu nghiệp vụ nhằm đảm bảo các luồng quy trình ISO phù hợp với yêu cầu của Ban lãnh đạo Công ty và phù hợp cho Trung tâm Phát triển phần mềm nắm rõ và thực hiện",
                "Triển khai kiểm tra hệ thống phần mềm, test các công đoạn phần mềm nhằm đảm bảo chất lượng phần mềm trước khi cung cấp cho khách hàng",
                "Test phần mềm trước khi đưa vào sử dụng. Tổng hợp các Bug phần mềm từ phía khách hàng ( có thể cần làm việc trực tiếp tại công ty khách hàng ) và cập nhật trên hệ thống ISO điện tử nhằm đảm bảo các nhân sự liên quan phải khắc phục triệt để - Kiểm tra lại các Bug và Approve các Bug này",
                "Đảm bảo tính khả thi và hỗ trợ triển khai. Đào tạo và hỗ trợ người dùng sử dụng hẹ thống phần mềm",
                "Quản lý thay đổi và kiểm soát chất lượng Quản lý yêu cầu thay đổi. Đảm bảo chất lượng phần mềm. Hợp tác với các bộ phận khác."
            ],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-03-03T07:25:21.868874",
            "DateUpdated": "2025-03-03T07:25:22.030213",
            "IdUpdated": 24,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,5688,",
            "Id": 5688,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".5",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.5",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00005",
            "TenToChuc": "Trung tâm Hỗ trợ & Quản lý nội bộ",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-14T03:27:12.030712",
            "DateUpdated": "2025-03-03T07:28:53.936869",
            "IdUpdated": 24,
            "IdToChucCapTren": 5688,
            "DuongDanSapXep": ",2673,5688,2675,",
            "Id": 2675,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".5.1",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.5.1",
            "ChucDanh_NhanSus": [
                {
                    "Id": 6457
                },
                {
                    "Id": 10501
                },
                {
                    "Id": 10502
                },
                {
                    "Id": 11518
                },
                {
                    "Id": 11520
                },
                {
                    "Id": 12522
                },
                {
                    "Id": 12526
                },
                {
                    "Id": 10505
                },
                {
                    "Id": 11514
                },
                {
                    "Id": 11522
                },
                {
                    "Id": 12522
                },
                {
                    "Id": 12526
                },
                {
                    "Id": 8486
                },
                {
                    "Id": 9496
                }
            ],
            "SttSort": "00001.00005.00001",
            "TenToChuc": "Hành chính - Nhân sự",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "Quản lý tài chính, kế toán: Ghi chép, theo dõi sổ sách. Lập báo cáo tài chính, Quản lý ngân sách",
                "Kiểm soát chi phí: Giám sát chi phí hoạt động. Kiểm tra chứng từ kế toán",
                "Quản lý thuế và các nghĩa vụ tài chính: Đảm bảo tuân thủ quy định pháp luật. Hỗ trợ kiểm toán",
                "Quản lý hành chính: Lưu trữ hồ sơ tài liệu. Công tác nhân sự và lao động.",
                "Hỗ trợ các phòng ban khác: Cung cấp thông tin tài chính. Hỗ trợ báo cáo và phân tích tài chính: Giúp các phòng ban khác hiểu rõ hơn về tình hình tài chính của công ty",
                "Tuyển dụng và Quản lý hợp đồng lao động: Ký kết hợp đồng lao động. Cập nhật thông tin nhân viên",
                "Quản lý chế độ đãi ngộ và phúc lợi của nhân viên"
            ],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2023-12-18T06:26:08.734967",
            "DateUpdated": "2025-03-03T07:29:48.667835",
            "IdUpdated": 24,
            "IdToChucCapTren": 5688,
            "DuongDanSapXep": ",2673,5688,2682,",
            "Id": 2682,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": ".5.2",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.5.2",
            "ChucDanh_NhanSus": [
                {
                    "Id": 9497
                }
            ],
            "SttSort": "00001.00005.00002",
            "TenToChuc": "Kế toán - Tài chính",
            "TinhTrang": 1018,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "Triển khai kinh doanh sản phẩm bao gồm: Bản cài đặt; bản Online ... ",
                "Phát triển thương hiệu hệ thống ISO điện tử tới khách hàng; ",
                "Quản lý, chăm sóc các khách hàng cũ/ hiện tại và đặc biệt là tìm kiếm các khách hàng tiềm năng",
                "Tham gia giới thiệu sản phẩm; báo giá; đấu thầu ... nhằm đảm bảo hiệu quả cao nhất",
                "Tìm kiếm và nghiên cứu, phát triển thị trường. Từ đó xây dựng chiến lược bán hàng",
                "Đàm phán và ký kết hợp đồng."
            ],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-05-13T01:34:08.172208",
            "DateUpdated": "2025-05-13T01:34:08.471542",
            "IdUpdated": 2378,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,6695,",
            "Id": 6695,
            "IdCreated": 2378,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".6",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.6",
            "ChucDanh_NhanSus": [
                {
                    "Id": 9499
                }
            ],
            "SttSort": "00001.00006",
            "TenToChuc": "Trung tâm R & D",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [
                "1. Thực hiện nghiên cứu chuyên sâu về sản phẩm, vật liệu, công nghệ, quy trình.\n\nLập kế hoạch thử nghiệm, ghi nhận kết quả, phân tích dữ liệu.\n\nThiết kế bản mẫu, tài liệu kỹ thuật, cải tiến tính năng sản phẩm hiện có.\n\nPhối hợp với QA để đánh giá chất lượng sản phẩm mới.",
                "Có sử dụng phạm vi"
            ],
            "TenNhanSu": "Võ Phú Định"
        },
        {
            "DateCreated": "2025-08-22T02:22:59.854259",
            "DateUpdated": "2025-08-22T02:23:00.212722",
            "IdUpdated": 1341,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,6729,",
            "Id": 6729,
            "IdCreated": 1341,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".7",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.7",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00007",
            "TenToChuc": "1",
            "TinhTrang": 1,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Nguyễn Xuân Chiến"
        },
        {
            "DateCreated": "2025-08-24T09:26:45.284368",
            "DateUpdated": "2025-08-24T09:26:48.492105",
            "IdUpdated": 1367,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,6730,",
            "Id": 6730,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": ".8",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.8",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00008",
            "TenToChuc": "TC-09",
            "TinhTrang": 1,
            "TrangThai": 5,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-11-27T07:13:11.879229",
            "DateUpdated": "2025-11-27T07:13:12.266073",
            "IdUpdated": 4395,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,6731,",
            "Id": 6731,
            "IdCreated": 4395,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "TC-10",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.9",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00009",
            "TenToChuc": "TC-10",
            "TinhTrang": 1,
            "TrangThai": 4,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "hiepmv@yopmail.com"
        },
        {
            "DateCreated": "2025-12-04T04:14:10.308682",
            "DateUpdated": "2025-12-04T04:14:10.708386",
            "IdUpdated": 24,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,7738,",
            "Id": 7738,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-19",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.10",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00010",
            "TenToChuc": "TC-19",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-12-04T04:15:11.003044",
            "DateUpdated": "2025-12-04T04:15:11.147453",
            "IdUpdated": 24,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,7739,",
            "Id": 7739,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-20",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.11",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00011",
            "TenToChuc": "TC-20",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-12-04T09:12:58.051014",
            "DateUpdated": "2025-12-04T09:13:02.385247",
            "IdUpdated": 2383,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,7740,",
            "Id": 7740,
            "IdCreated": 2383,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-21",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.12",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00012",
            "TenToChuc": "Test xóa",
            "TinhTrang": 1,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "clone1"
        },
        {
            "DateCreated": "2025-12-10T04:18:02.93996",
            "DateUpdated": "2025-12-10T04:18:03.330138",
            "IdUpdated": 1367,
            "IdToChucCapTren": 2673,
            "DuongDanSapXep": ",2673,7741,",
            "Id": 7741,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-22(Hủy)",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "1.13",
            "ChucDanh_NhanSus": [],
            "SttSort": "00001.00013",
            "TenToChuc": "TC-22(Hủy)",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T06:43:09.393921",
            "DateUpdated": "2025-08-21T06:43:13.244902",
            "IdUpdated": 24,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6697,",
            "Id": 6697,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-06",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00002",
            "TenToChuc": "Tổ chức ngoài",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:44:34.452552",
            "DateUpdated": "2025-08-21T06:44:34.59713",
            "IdUpdated": 24,
            "IdToChucCapTren": 6697,
            "DuongDanSapXep": ",6697,6698,",
            "Id": 6698,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-06.1",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "2.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00002.00001",
            "TenToChuc": "Tổ chức ngoài con 1",
            "TinhTrang": 1,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T07:40:16.821807",
            "IdUpdated": 1367,
            "IdToChucCapTren": 6697,
            "DuongDanSapXep": ",6697,6708,",
            "Id": 6708,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "TC-06.2",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "2.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00002.00002",
            "TenToChuc": "TC-B11",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.392745",
            "IdUpdated": 24,
            "IdToChucCapTren": 6708,
            "DuongDanSapXep": ",6697,6708,6709,",
            "Id": 6709,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "TC-06.2.1",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "2.2.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00002.00002.00001",
            "TenToChuc": "TC-B11-1",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.495434",
            "IdUpdated": 24,
            "IdToChucCapTren": 6708,
            "DuongDanSapXep": ",6697,6708,6710,",
            "Id": 6710,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "TC-06.2.2",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "2.2.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00002.00002.00002",
            "TenToChuc": "TC-B11-2",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:10.029469",
            "IdUpdated": 24,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6699,",
            "Id": 6699,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "A",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "3",
            "ChucDanh_NhanSus": [],
            "SttSort": "00003",
            "TenToChuc": "TC-A",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:08.529271",
            "IdUpdated": 24,
            "IdToChucCapTren": 6699,
            "DuongDanSapXep": ",6699,6700,",
            "Id": 6700,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "A.1",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "3.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00003.00001",
            "TenToChuc": "TC-A01",
            "TinhTrang": 0,
            "TrangThai": 4,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:08.649695",
            "IdUpdated": 24,
            "IdToChucCapTren": 6700,
            "DuongDanSapXep": ",6699,6700,6701,",
            "Id": 6701,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "A.1.1",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "3.1.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00003.00001.00001",
            "TenToChuc": "TC-A011",
            "TinhTrang": 0,
            "TrangThai": 4,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:08.769959",
            "IdUpdated": 24,
            "IdToChucCapTren": 6701,
            "DuongDanSapXep": ",6699,6700,6701,6702,",
            "Id": 6702,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "A.1.1.1",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "3.1.1.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00003.00001.00001.00001",
            "TenToChuc": "TC-A011-01",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:08.945217",
            "IdUpdated": 24,
            "IdToChucCapTren": 6699,
            "DuongDanSapXep": ",6699,6704,",
            "Id": 6704,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "A.2",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "3.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00003.00002",
            "TenToChuc": "TC-A02",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:46:23.353887",
            "IdUpdated": 24,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6703,",
            "Id": 6703,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "A.1.1.2",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "4",
            "ChucDanh_NhanSus": [],
            "SttSort": "00004",
            "TenToChuc": "TC-A011-02 tét",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.028251",
            "IdUpdated": 24,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6705,",
            "Id": 6705,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "01181",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "5",
            "ChucDanh_NhanSus": [],
            "SttSort": "00005",
            "TenToChuc": "TC-A021",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.111671",
            "IdUpdated": 24,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6706,",
            "Id": 6706,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "B",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "6",
            "ChucDanh_NhanSus": [],
            "SttSort": "00006",
            "TenToChuc": "TC-B",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.193968",
            "IdUpdated": 24,
            "IdToChucCapTren": 6706,
            "DuongDanSapXep": ",6706,6707,",
            "Id": 6707,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "B.1",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "6.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00006.00001",
            "TenToChuc": "TC-B1",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.585743",
            "IdUpdated": 24,
            "IdToChucCapTren": 6706,
            "DuongDanSapXep": ",6706,6711,",
            "Id": 6711,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "B.2",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "6.2",
            "ChucDanh_NhanSus": [],
            "SttSort": "00006.00002",
            "TenToChuc": "TC-B2",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T06:45:06.844858",
            "DateUpdated": "2025-08-21T06:45:09.685503",
            "IdUpdated": 24,
            "IdToChucCapTren": 6711,
            "DuongDanSapXep": ",6706,6711,6712,",
            "Id": 6712,
            "IdCreated": 24,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "B.2.1",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "6.2.1",
            "ChucDanh_NhanSus": [],
            "SttSort": "00006.00002.00001",
            "TenToChuc": "TC-B21",
            "TinhTrang": 0,
            "TrangThai": 1,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Admin"
        },
        {
            "DateCreated": "2025-08-21T07:42:29.756761",
            "DateUpdated": "2025-08-21T07:42:32.512652",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6716,",
            "Id": 6716,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "011",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "7",
            "ChucDanh_NhanSus": [],
            "SttSort": "00007",
            "TenToChuc": "TC-A011",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T07:42:29.756761",
            "DateUpdated": "2025-08-21T07:42:32.653809",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6717,",
            "Id": 6717,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "0111-01110",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "8",
            "ChucDanh_NhanSus": [],
            "SttSort": "00008",
            "TenToChuc": "TC-A011-01",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T07:42:29.756761",
            "DateUpdated": "2025-08-21T07:42:32.781263",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6718,",
            "Id": 6718,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "0111-01120",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "9",
            "ChucDanh_NhanSus": [],
            "SttSort": "00009",
            "TenToChuc": "TC-A011-02",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T07:42:29.756761",
            "DateUpdated": "2025-08-21T07:42:32.943051",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6719,",
            "Id": 6719,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "0118",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "10",
            "ChucDanh_NhanSus": [],
            "SttSort": "00010",
            "TenToChuc": "TC-A02",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T07:42:29.756761",
            "DateUpdated": "2025-08-21T07:42:33.066105",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6720,",
            "Id": 6720,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 2,
            "MaToChuc": "01181",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "11",
            "ChucDanh_NhanSus": [],
            "SttSort": "00011",
            "TenToChuc": "TC-A021",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-08-21T07:42:29.756761",
            "DateUpdated": "2025-08-21T07:42:33.214676",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6721,",
            "Id": 6721,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "2434",
            "NoiDungChinhSua": null,
            "PhienBan": 0,
            "Stt": "12",
            "ChucDanh_NhanSus": [],
            "SttSort": "00012",
            "TenToChuc": "TC-B",
            "TinhTrang": 0,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        },
        {
            "DateCreated": "2025-11-28T07:04:28.199578",
            "DateUpdated": "2025-11-28T07:04:28.538945",
            "IdUpdated": 1346,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",6732,",
            "Id": 6732,
            "IdCreated": 1346,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-11",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "13",
            "ChucDanh_NhanSus": [],
            "SttSort": "00013",
            "TenToChuc": "sssssssssssss",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Diệp Xuân Song"
        },
        {
            "DateCreated": "2025-12-04T04:01:06.068062",
            "DateUpdated": "2025-12-04T04:01:06.395383",
            "IdUpdated": 1367,
            "IdToChucCapTren": null,
            "DuongDanSapXep": ",7737,",
            "Id": 7737,
            "IdCreated": 1367,
            "LaCongTyMe": false,
            "Loai": 1,
            "MaToChuc": "TC-18",
            "NoiDungChinhSua": "",
            "PhienBan": 0,
            "Stt": "14",
            "ChucDanh_NhanSus": [],
            "SttSort": "00014",
            "TenToChuc": "fffffffffffffff",
            "TinhTrang": 1,
            "TrangThai": 2,
            "NoiDungChucNangNhiemVus": [],
            "TenNhanSu": "Mai Văn Hiệp"
        }
    ],
    "Total": 51,
    "Take": 51,
    "Page": 1
}