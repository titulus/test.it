var testit = {
    '_first failed': 'test which failed',
    'passed': 10,
    'failed': 2,
    'tests': {
        'initial' : {
            'passed': 10,
            'failed': 2,
            'tests' : [
                {'passed':this},
                {'failed':'aaa'},
                {'passed':'dsa'}
            ]
        }
    }
}

console.log(testit);