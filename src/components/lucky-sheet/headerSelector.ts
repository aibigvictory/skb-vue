interface HeaderRange {
    sheetIndex: number,
    row: number[],
    column: number[],
}

export class HeaderSelector {
    headerMap: Map<number, HeaderRange>;
    sheetLength: number = 0;

    constructor() {
        this.headerMap = new Map<number, HeaderRange>();
    }

    public init(sheets: any[]) {
        this.sheetLength = sheets.length;
        sheets.forEach((sheet) => {
            const sheetOrder = Number(sheet.order);
            const sheetIndex = Number(sheet.index);
            
            const range = {
                sheetIndex,
                row: [0, 2],
                column: [0, 10],
            };

            this.headerMap.set(sheetOrder, range);
        })
    }

    public getHeaderRange(sheetOrder: number) {
        return this.headerMap.get(sheetOrder);
    }

    public setHeaderRange(sheetOrder: number, headerRange: HeaderRange) {
        return this.headerMap.set(sheetOrder, headerRange);
    }

    public getHeaderRanges() {
        const ranges: HeaderRange[] = [];
        this.headerMap.forEach((value, key, map) => {
            ranges.push(value);
        });

        return ranges;
    }

    public selectRange(sheet: any, range: HeaderRange) {
        const sheetOrder = Number(sheet.order);
        
        for (let i = sheetOrder; i < this.sheetLength; i++) {
            const headerRange = this.getHeaderRange(i);
            if (!headerRange) {
                continue;
            }

            const _range: HeaderRange = {
                sheetIndex: headerRange.sheetIndex,
                row: range.row.slice(),
                column: range.column.slice(),
            };
            this.setHeaderRange(i, _range);
        }

        const ranges = this.getHeaderRanges();
        ranges.forEach((range) => {
            console.log(`sheetIndex: ${range.sheetIndex}, row: [${range.row}], column: [${range.column}]`)
        });
    }
}