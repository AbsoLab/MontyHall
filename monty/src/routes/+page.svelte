<script>
    import axios from 'axios';
    import Door from '../components/Door.svelte';

    // 통계 관련
    let changeWin, changeLose, changeRate;
    let unChangeWin, unChangeLose, unChangeRate;
    let totalWin, totalLose, totalRate;

    // 게임 관련
    let gameText, gameState;
    let selectedDoor, answerDoor, openDoor, doorStates;

    const getStatsInfo = () => {
            axios.get('http://192.168.6.31:3000').then(res => {
            const data = res.data;
            changeWin = data[0].val;
            changeLose = data[1].val;
            unChangeWin = data[2].val;
            unChangeLose = data[3].val;

            totalWin = changeWin + unChangeWin;
            totalLose = changeLose + unChangeLose;
            totalRate = (totalWin / (totalWin + totalLose)) * 100;
            changeRate = (changeWin / (changeWin + changeLose)) * 100;
            unChangeRate = (unChangeWin / (unChangeWin + unChangeLose)) * 100;

            totalRate = totalRate ? totalRate.toFixed(3) : 0;
            changeRate = changeRate ? changeRate.toFixed(3) : 0;
            unChangeRate = unChangeRate ? unChangeRate.toFixed(3) : 0;
        });
    }

    const getOpenDoor = () => {

        if (selectedDoor == answerDoor) {
            let rn = Math.floor(Math.random() * 2);
            if (selectedDoor == 0) { return rn + 1; }
            if (selectedDoor == 1) { return rn * 2; }
            if (selectedDoor == 2) { return rn; }
        }
        for (let idx = 0; idx < 3; ++idx) {
            if (idx !== selectedDoor && idx !== answerDoor) return idx;
        }
    }

    const initGame = () => {
        gameText = "게임시작을 눌러주세요";
        gameState = 0;
        doorStates = [0, 0, 0];
    }
    const startGame = () => {
        if (gameState === 3) {
            initGame();
            gameState = 0;
        }
        if (gameState === 0) {
            gameText = "문을 선택 해 주세요";
            answerDoor = Math.floor(Math.random() * 3);
            gameState = 1;
        }
    }
    const handleDoorClick = (idx) => {
        if (gameState === 1) {
            selectedDoor = idx;
            openDoor = getOpenDoor();
            gameText = `짜잔! ${openDoor + 1}번째 문에 염소가 있었습니다! 문을 한 번 더 선택 해 주세요 (현재 선택: ${idx + 1})`;
            doorStates[openDoor] = 2;
            gameState = 2;
        }
        else if (gameState === 2 && idx !== openDoor) {
            if (idx === answerDoor) {
                doorStates[idx] = 3;
                gameText = `축하드립니다~ 성공하셨습니다! 다시하시려면 게임 시작 버튼을 눌러주세요`;
                gameState = 3;
                if (idx === selectedDoor) {
                    axios.get('http://localhost:3000/3').then(_ => getStatsInfo());
                } else {
                    axios.get('http://localhost:3000/1').then(_ => getStatsInfo());
                }
            } else {
                doorStates[idx] = 2;
                gameText = `저런! 실패하셨습니다! 다시하시려면 게임 시작 버튼을 눌러주세요`;
                gameState = 3;
                if (idx === selectedDoor) {
                    axios.get('http://localhost:3000/4').then(_ => getStatsInfo());
                } else {
                    axios.get('http://localhost:3000/2').then(_ => getStatsInfo());
                }
            }
        }
    }

    getStatsInfo();
    initGame();
</script>

<div class="main-container">
    <headder>모온티호올</headder>
    <section class="stat-container">
        <table>
            <thead>
                <td>구분</td>
                <td>계</td>
                <td>성공</td>
                <td>실패</td>
                <td>통계</td>
            </thead>
            <tbody>
                <tr>
                    <td>계</td>
                    <td>{totalWin + totalLose}</td>
                    <td>{totalWin}</td>
                    <td>{totalLose}</td>
                    <td>{totalRate}%</td>
                </tr>
                <tr>
                    <td>변경</td>
                    <td>{changeWin + changeLose}</td>
                    <td>{changeWin}</td>
                    <td>{changeLose}</td>
                    <td class="rate-text">{changeRate}%</td>
                </tr>
                <tr>
                    <td>그대로</td>
                    <td>{unChangeWin + unChangeLose}</td>
                    <td>{unChangeWin}</td>
                    <td>{unChangeLose}</td>
                    <td class="rate-text">{unChangeRate}%</td>
                </tr>
            </tbody>
        </table>
    </section>
    <section class="door-container">
        {#each Array(3) as _, idx}
        <button on:click={() => handleDoorClick(idx) }><Door state="{doorStates[idx]}"/></button>
        {/each}
    </section>
    <section class="game-container">
        <div class="game-text">{gameText}</div>
        <button on:click="{startGame}">게임 시작</button>
    </section>
</div>

<style>
    .main-container { display: flex; flex-direction: column; height: 100vh; background-color: #eee; }
    section { display: flex; }

    headder { text-align: center; padding: 10px; font-size: 20px; font-weight: bold; }
    .stat-container { flex-direction: column; align-items: center; }
    .stat-container table { border-spacing: 0; margin: 10px; border-collapse: collapse; }
    .stat-container td { width: 70px; margin: 0; padding: 3px; border: 1px solid #000; text-align: center; font-size: 8pt; }
    .stat-container .rate-text { font-weight: bold; }

    .door-container { justify-content: center; margin: 10px; background-color: #ead; }
    .door-container button { border: none; background-color:unset; }

    .game-container { flex-direction: column; align-items: center; }
    .game-container .game-text { margin: 10px; }
    .game-container button { width: 100px;}
</style>