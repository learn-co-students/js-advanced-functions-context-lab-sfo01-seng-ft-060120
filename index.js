/* Your Code Here */

const createEmployeeRecord = (arr) => {
    let record = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [ ],
        timeOutEvents: [ ]
    }
    return record
}

const createEmployeeRecords = (arr) => {
    return arr.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(timeStamp){    
    let [date, hour] = timeStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return this
}

const createTimeOutEvent = function(date){
    let dateSplit = date.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        date: dateSplit[0],
        hour: parseInt(dateSplit[1])
    })

    return this
}

const hoursWorkedOnDate = function(date){
    
    let timeIn = this.timeInEvents.find(event => event.date === date).hour
    let timeOut = this.timeOutEvents.find(event => event.date === date).hour

    if (timeIn && timeOut) {
        return (timeOut - timeIn) / 100
    }
    else {
        return null
    }
    
}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
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

const calculatePayroll = function(employees) {
    let payrollTotal = employees.reduce(function(total, employee){
        return allWagesFor.call(employee) + total
    }, 0)
    return payrollTotal
}

const findEmployeeByFirstName = function(employees, name) {
    return employees.find(employee => {
        employee.firstName === name
        return employee
    })
}
