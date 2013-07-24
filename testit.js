var testit = function(params) {
    var _it = function(a, b) {
        var error;
        try {
            typeof(a);
        } catch (exception) {
            error = exception;
        } finally {
            if (error) {
                console.log('error');
            } else {
                console.log('try smthn');
            }
        }
    }
    this.it = _it;
}

window.test = new testit();