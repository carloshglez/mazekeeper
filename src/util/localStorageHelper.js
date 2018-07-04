export const LocalStorageManager = {
	setTopScore: (mazeId, steps, time) => {
        let topScore = JSON.stringify({mazeId, steps, time});

        if(LocalStorageManager.scoreExists(mazeId)) {
            let oldTopScores = LocalStorageManager.getTopScores();
            let replacer = function (key, value) {
                if(typeof value === 'object' && !value.length && value.mazeId === mazeId) {
                    if (steps < value.steps) value.steps = steps;
                    if (time < value.time) value.time = time;
                }
                return value;
            };
            let newTopScores = JSON.stringify(oldTopScores, replacer);
            localStorage['top_maze_score'] = newTopScores.replace('[','').replace(']','');

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

//localStorage.clear();
let GLOBAL_TOP_SCORES = LocalStorageManager.getTopScores();

// LocalStorageManager.setTopScore(0,15,25);
// LocalStorageManager.setTopScore(1,30,40);
// LocalStorageManager.setTopScore(2,50,60);
// LocalStorageManager.setTopScore(0,10,20);
// LocalStorageManager.setTopScore(0,90,90);
// console.log(LocalStorageManager.getTopScores());

// console.log(LocalStorageManager.getTopScores().length);
// console.log(LocalStorageManager.getTopScoreOf(0));
// console.log(LocalStorageManager.getTopScoreOf(1).steps);
