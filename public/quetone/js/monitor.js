const API_URL = 'https://sawfish-robust-closely.ngrok-free.app/api';

function timeToMinutes(timeString) {
    // 분과 시간을 나눠 배열에 저장
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // 시간을 분 단위로 변환
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
};
function minutesToTime(minutes) {
    if (typeof minutes !== 'number' || minutes < 0) {
        return null; // 유효하지 않은 입력에 대해 null 반환
    }

    const hours = Math.floor(minutes / 60);
    const remainderMinutes = minutes % 60;

    // 시간과 분을 두 자리로 표현
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = remainderMinutes.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
};
function minutesFromMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(0, 0, 0, 0); // 현재 날짜의 자정으로 설정

    const elapsedMilliseconds = now - midnight;
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (60 * 1000));

    return elapsedMinutes;
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
    // 미수신기간 계산
    let isNonReceive = false;
    // cueM, B 값 다른지 여부
    const differentCue = cueM !== cueB;
    const receiveMinutes = timeToMinutes(chrReceiveTime);
    const nonReceiveMinutes = minutesFromMidnight() - receiveMinutes;
    // 만약 미수신 시간 4시간보다 크면 오류 빨간색 표시
    if (nonReceiveMinutes > 240) {
        isNonReceive = true;
    }
    const nonReceiveTime = minutesToTime(minutes);

    const tr = `
<tr>
    <th scope="row">${no}</th>
    <td><a href="${chLink}" target="_blank">${chName}</a></td>
    <td><a href="${chLink}" target="_blank">${chNumber}</a></td>
    <td><a href="${chLink}" target="_blank">${psipSrcNo}</a></td>
    <td>${nCTModuleID}</td>
    <td>${nCTPortID}</td>
    <td>${chrReceiveDate}</td>
    <td ${isNonReceive ? ' style="font-color: red"' : ''}>${chrReceiveTime}</td>
    <td ${isNonReceive ? ' style="font-color: red"' : ''}>${nonReceiveTime}</td>
    <td ${differentCue ? ' style="font-color: red"' : ''}>${cueM}</td>
    <td ${differentCue ? ' style="font-color: red"' : ''}>${cueB}</td>
</tr>
`;

    return tr;
}

const logObserver = window.SWR(`${API_URL}/quetone/logs`, fetcher, options);
const logWatcher = logObserver.watch(({ data, error }) => {
    // data - data for given key resolved by fetcher
    // error - error thrown by fetcher
    console.table(data);
    // 데이터
    const logs = data.map((v, i, arr) => {
        return createLogTr({
            no: i,
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