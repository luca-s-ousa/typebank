export type Transfer = {
  _id: string;
  date?: Date;
  source_account_number: number;
  destination_account_number: number;
  value: number;
};
