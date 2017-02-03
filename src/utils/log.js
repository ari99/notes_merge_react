
/**
* Use to log to a file because Jasmine doesn't display console.log.
*/
export const log = (msg) => {
   console.log(msg)

  //require('fs').appendFileSync('/tmp/jest.log.txt', msg + '\n', {'encoding': 'utf8'});
}