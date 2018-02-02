export const LocalStorageManager = {
	setTopScore: (mazeId, steps, time) => {
        let topScore = JSON.stringify({mazeId, steps, time});

        if(LocalStorageManager.scoreExists(mazeId)) {

        } else {
            GLOBAL_TOP_SCORES = (GLOBAL_TOP_SCORES.length) ? GLOBAL_TOP_SCORES + '|' + topScore : topScore;
		    localStorage['top_maze_score'] = GLOBAL_TOP_SCORES;
        }
	},
	getTopScores: () => {
		return (localStorage['top_maze_score'])
		? JSON.parse('[' + localStorage['top_maze_score'].replace(/\|/g,',') + ']')
		: [];
    },
	getTopScoreOf: (mazeId) => {
		return (mazeId < LocalStorageManager.getTopScores().length) ? LocalStorageManager.getTopScores()[mazeId] : {};
    },
    scoreExists: (mazeId) => {
        return (LocalStorageManager.getTopScoreOf(mazeId).mazeId === mazeId);
    }
}

localStorage.clear();
let GLOBAL_TOP_SCORES = LocalStorageManager.getTopScores();

LocalStorageManager.setTopScore(0,10,20);
LocalStorageManager.setTopScore(1,30,40);
LocalStorageManager.setTopScore(0,50,60);
console.log(LocalStorageManager.getTopScores());
