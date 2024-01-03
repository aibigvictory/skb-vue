// [{ row: [0, 2], column: [0, 10] }]
interface HeaderRange {
    row: number[],
    column: number[],
}

export class HeaderSelector {
    headerMap: Map<number, HeaderRange[]>;
    sheetLength: number = 0;

    constructor() {
        this.headerMap = new Map<number, HeaderRange[]>();
    }

    public init(sheets: any[]) {
        this.sheetLength = sheets.length;
        sheets.forEach((sheet) => {
            const sheetIndex = Number(sheet.order);
            const range = [
                {
                    row: [0, 2],
                    column: [0, 10],
                }
            ];
            this.headerMap.set(sheetIndex, range);
        })
    }

    public getHeaderRange(sheetIndex: number) {
        return this.headerMap.get(sheetIndex);
    }

    public setHeaderRange(sheetIndex: number, headerRange: HeaderRange[]) {
        return this.headerMap.set(sheetIndex, headerRange);
    }

    public getHeaderRanges() {
        const ranges: any[] = [];
        this.headerMap.forEach((value, key, map) => {
            ranges.push({
                sheetIndex: key,
                headerRange: value[0],
            });
        });

        return ranges;
    }

    public selectRange(sheet: any, ranges: any[]) {
        const sheetIndex = Number(sheet.order);
        const range = [
            {
                row: ranges[0].row,
                column: ranges[0].column,
            }
        ];
        
        for (let i = sheetIndex; i < this.sheetLength; i++) {
            this.setHeaderRange(i, range);
        }
    }
}