const API_URL = 'http://192.168.213.200/api';
// const API_URL = 'http://localhost:9494';

function timeToMinutes(timeString) {
    try {
        // 분과 시간을 나눠 배열에 저장
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        // 시간을 분 단위로 변환
        const totalMinutes = hours * 60 + minutes;

        return totalMinutes;
    } catch (e) {
        console.error(`${e} => timeString: (${timeString})`);
    }
};
function minutesToTime(minutes) {
    if (typeof minutes !== 'number' || minutes < 0) {
        return 'N/A';
    }
    if (isNaN(minutes)) {
        return 'N/A';
    }

    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;

    // 시간과 분을 두 자리로 표현
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainderMinutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};
function splitArrayIntoThree(array) {
    if (!Array.isArray(array)) {
      return null; // 배열이 아닌 경우 예외 처리
    }
  
    const totalLength = array.length;
    const chunkSize = Math.ceil(totalLength / 3);
  
    const dividedArrays = [];
  
    for (let i = 0; i < totalLength; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      dividedArrays.push(chunk);
    }
  
    return dividedArrays;
};
function getDifferenceInMinutes(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);

    return differenceInMinutes;
}
function formatNA(value) {
    return value ?? `<span style="color: red; font-weight: bold;">N/A</span>`;
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const options = {
    refreshInterval: 60 * 1000
};

function createLogTr({
    no,
    chName,
    chNumber,
    chLink,
    psipSrcNo,
    nCTModuleID,
    nCTPortID,
    chrReceiveDate,
    chrReceiveTime,
    cueM,
    cueB
}) {
    try {
        // 미수신기간 계산
        let isNonReceive = false;
        // cueM, B 값 다른지 여부
        const differentCue = cueM !== cueB;
        // 미수신 기간(분) = 현재 시간 - 마지막 수신 시간
        const nonReceiveMinutes = getDifferenceInMinutes(`${chrReceiveDate} ${chrReceiveTime}`);
        // 만약 미수신 시간 4시간보다 크면 오류 빨간색 표시
        if (nonReceiveMinutes > 240) {
            isNonReceive = true;
        }
        const nonReceiveTime = minutesToTime(nonReceiveMinutes);

        const tr = `
<tr>
    <th scope="row">${no}</th>
    <td><a href="${chLink}" target="_blank">${formatNA(chName)}</a></td>
    <td>${formatNA(chNumber)}</td>
    <td>${formatNA(psipSrcNo)}</td>
    <td>${formatNA(nCTModuleID)}</td>
    <td>${formatNA(nCTPortID)}</td>
    <td>${formatNA(chrReceiveDate?.substring(5))}</t
    <td ${isNonReceive ? ' style="color: red; font-weight: bold;"' : ''}>${formatNA(chrReceiveTime?.slice(0, -3))}</td>
    <td ${isNonReceive ? ' style="color: red; font-weight: bold;"' : ''}>${formatNA(nonReceiveTime)}</td>
    <td ${differentCue ? ' style="color: red; font-weight: bold;"' : ''}>${formatNA(cueM)}</td>
    <td ${differentCue ? ' style="color: red; font-weight: bold;"' : ''}>${formatNA(cueB)}</td>
</tr>
`;
        return tr;
    } catch (e) {
        console.error(e);
    }
}

function createClipTr({
    no, vchrTitle, dtCreateDate, dtModifyDate
}) {
    try {
        const tr = `
<tr>
    <th scope="row">${no}</th>
    <td>${vchrTitle}</td>
    <td>${dtCreateDate}</td>
    <td>${dtModifyDate}</td>
</tr>
`;
        return tr;
    } catch (e) {
        console.error(e);
    }
}

const logObserver = window.SWR(`${API_URL}/quetone/logs`, fetcher, options);
const logWatcher = logObserver.watch(({ data, error }) => {
    // data - data for given key resolved by fetcher
    // error - error thrown by fetcher
    console.log(data.data);
    // 데이터
    const logs = data.data.map((v, i, arr) => {
        return createLogTr({
            no: i + 1,
            ...v
        });
    });
    const [log1, log2, log3] = splitArrayIntoThree(logs);

    // ID가 'log1'인 요소를 찾기
    const table1 = document.getElementById('log1');
    if (table1 && table1.tBodies.length > 0) {
        table1.tBodies[0].innerHTML = log1.join('');
    }
    const table2 = document.getElementById('log2');
    if (table2 && table2.tBodies.length > 0) {
        table2.tBodies[0].innerHTML = log2.join('');
    }
    const table3 = document.getElementById('log3');
    if (table3 && table3.tBodies.length > 0) {
        table3.tBodies[0].innerHTML = log3.join('');
    }
});

const clipObserver = window.SWR(`${API_URL}/quetone/clips`, fetcher, options);
const clipWatcher = clipObserver.watch(({ data, error }) => {
    // data - data for given key resolved by fetcher
    // error - error thrown by fetcher
    console.log(data);
    // 데이터
    const clips = data.map((v, i, arr) => {
        return createClipTr({
            no: i + 1,
            ...v
        });
    });

    const table1 = document.getElementById('clip');
    if (table1 && table1.tBodies.length > 0) {
        table1.tBodies[0].innerHTML = clips.join('');
    }
});