interface SavedDataClassInterface {
  dataList: {
    date: string;
    distance: number;
    actions?: string;
  }[];
  addData: (date: string, distance: number) => void;
}

export class SavedData implements SavedDataClassInterface {
  readonly _dataList: {
    date: string;
    distance: number;
    actions?: string;
  }[];
  constructor() {
    this._dataList = [];
  }

  addData(date: string, distance: number) {
    this._dataList.push({ date, distance });
  }

  get dataList(): { date: string; distance: number; actions?: string }[] {
    return this._dataList;
  }
}
