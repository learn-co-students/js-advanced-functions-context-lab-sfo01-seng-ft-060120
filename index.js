/* Your Code Here */

const createEmployeeRecord = (employeeArray) => {
    return {
        firstName: employeeArray[0], 
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employeesArray) => {
    return employeesArray.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ') 
    this.timeInEvents.push({
        type: "TimeIn", date,
        hour: parseInt(hour, 10)
    })
    return this 
}

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ') 
    this.timeOutEvents.push({
        type: "TimeOut", date,
        hour: parseInt(hour, 10)
    })
    return this 
}

const hoursWorkedOnDate = function(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date) 
    let timeOut = this.timeOutEvents.find(e => e.date === date)
    return (timeOut.hour - timeIn.hour) / 100 
}

const wagesEarnedOnDate = function(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date)
    return parseInt(hoursWorked) * parseInt(this.payPerHour)
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

const findEmployeeByFirstName = function(employeesArray, firstName) { 
    return employeesArray.find(function(employee) {
        return employee.firstName === firstName 
    }) 
}

const calculatePayroll = function(employeesArray) {
    let wages = employeesArray.map(employee => allWagesFor.call(employee))
    return wages.reduce(function(a,b) {
        return a + b 
    })
}