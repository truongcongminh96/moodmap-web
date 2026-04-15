# MoodMap

MoodMap là một ứng dụng web giúp người dùng "đọc tâm trạng" của một thành phố trong ngày hôm đó thông qua thời tiết, âm nhạc, quote truyền cảm hứng và gợi ý hoạt động phù hợp.

Ý tưởng được thiết kế theo tinh thần hackathon: dễ demo, trực quan, có tính sản phẩm, và đủ không gian để làm UI thật đẹp.

## Global Hack Week Idea

### Concept

Người dùng nhập tên một thành phố, hệ thống sẽ:

- lấy dữ liệu thời tiết
- lấy thêm dữ liệu quote, âm nhạc hoặc nội dung liên quan
- áp dụng business logic để suy ra "mood" của thành phố
- trả về một `mood pack` hoàn chỉnh cho ngày hôm đó

Ví dụ:

> Hà Nội hôm nay mưa nhẹ -> mood: chill, reflective  
> Gợi ý: 3 bài nhạc, 1 quote, 1 hoạt động nên làm

## Vì sao ý tưởng này hợp hackathon

- Rất trực quan, người xem demo hiểu ngay trong vài giây
- Có API integration rõ ràng và dễ giải thích
- Có business logic thú vị: weather -> mood -> recommendations
- Dễ đầu tư phần frontend để tạo cảm giác sản phẩm cao cấp
- Ảnh chụp màn hình đẹp, hợp để pitch và submit

## MVP

Phiên bản tối thiểu của MoodMap gồm:

- nhập tên thành phố
- lấy dữ liệu thời tiết theo thành phố
- mapping thời tiết sang mood
- trả về:
  - mood label
  - quote
  - danh sách nhạc gợi ý
  - activity suggestion

## API Có Thể Dùng

- OpenWeather API
- Spotify API hoặc Last.fm API
- ZenQuotes API hoặc Quotable API

Trong repo frontend hiện tại, app đang gọi backend MoodMap API thông qua biến môi trường:

```env
VITE_API_BASE_URL=https://moodmap-api-truongcongminh1110-hfn4tcbl.apn.leapcell.dev
```

Endpoint được frontend sử dụng:

```text
GET ${VITE_API_BASE_URL}/api/v1/mood-pack?city=${city}&source=all
```

## Mood Pack Trả Về

Frontend hiển thị một "Mood Dashboard" từ dữ liệu backend, bao gồm:

- location
- weather
- mood
- quote
- music recommendations
- activities
- summary
- metadata và sources

Ví dụ trải nghiệm:

- Thành phố: Hanoi
- Weather: broken clouds
- Mood: Calm & Soft
- Summary: một ngày nhẹ, hợp để đọc sách, lên kế hoạch, nghe nhạc nền dịu

## Tính năng frontend hiện tại

- Hero section đậm chất product landing page
- Search bar đẹp, nhập tên thành phố và bấm Enter để fetch
- Tự động load `Hanoi` khi mở app
- Giữ lại dữ liệu cũ khi đang loading request mới
- Skeleton loading cho trạng thái đầu
- Error state bằng Ant Design `Result`
- Dashboard gồm:
  - quick info row
  - mood overview card
  - quote card
  - weather card
  - music section
  - activities card
  - footer meta

## Tech Stack

- React
- TypeScript
- Vite
- Ant Design
- Modern CSS

## Cấu trúc thư mục chính

```text
src/
  App.tsx
  main.tsx
  styles.css
  types/
    mood.ts
  services/
    moodApi.ts
  components/
    HeroSection.tsx
    SearchBar.tsx
    QuickStatsRow.tsx
    MoodOverviewCard.tsx
    QuoteCard.tsx
    MusicSection.tsx
    WeatherCard.tsx
    ActivitiesCard.tsx
    FooterMeta.tsx
```

## Chạy local

### 1. Cài dependencies

```bash
npm install
```

### 2. Chạy dev server

```bash
npm run dev
```

### 3. Build production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Cấu hình API

Tạo file `.env` với nội dung:

```env
VITE_API_BASE_URL=https://moodmap-api-truongcongminh1110-hfn4tcbl.apn.leapcell.dev
```

Nếu cần đổi API backend, chỉ cần sửa giá trị `VITE_API_BASE_URL`.

## Ghi chú cho môi trường dev

Backend hiện tại có thể không mở CORS trực tiếp cho browser. Vì vậy frontend đã được cấu hình fallback qua Vite proxy trong môi trường development để local app vẫn gọi API ổn định.

## Hướng mở rộng sau MVP

- thêm mood themes phong phú hơn
- thêm movie/book suggestions
- cá nhân hóa theo thời gian trong ngày
- AI-generated summary tinh tế hơn
- lưu lịch sử mood của các thành phố
- chia sẻ mood card lên social

## Demo Pitch Ngắn

MoodMap biến dữ liệu API thành một trải nghiệm cảm xúc dễ hiểu và đẹp mắt. Thay vì chỉ hiển thị thời tiết, app kể cho người dùng biết "thành phố hôm nay cảm thấy như thế nào" và gợi ý cách tận hưởng ngày đó qua nhạc, quote và hoạt động phù hợp.

## License

MIT
