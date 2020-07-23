/* Your Code Here */
const createEmployeeRecord = (array) => {
    return Object.assign({}, {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    })
}

const createEmployeeRecords = arrays => {
    return arrays.map( employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

const createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

const hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(e => e.date === date)
    let timeOut = this.timeOutEvents.find(e => e.date === date)
    return (timeOut.hour - timeIn.hour)/100
}

const wagesEarnedOnDate = function(date){
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    for (const employee of srcArray) {
        if (employee.firstName === firstName) {
            return employee
        }
    }
}

const calculatePayroll = function(array) {
    return array.reduce(function(acc, employee){
        return acc + allWagesFor.call(employee)}, 0)
}