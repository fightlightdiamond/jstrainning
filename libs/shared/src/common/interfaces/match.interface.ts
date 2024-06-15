/**
 * Tạo ra sẵn tất cả các kèo từ trước 100 kèo
 */
export interface MatchInterface {
  id: number;
  heroInfo: string;
  turns: string;
  turnNumber: number;
  /**
   * PENDING | PROCESSING | DONE
   */
  status: number;
  winner: number;
  loser: number;
  type: number;
  startTime: number;
}
