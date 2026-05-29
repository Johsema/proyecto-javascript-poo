/* class bankAccount {
    constructor (owner,ownerId,balance){
        this.owner = owner
        this.ownerId = ownerId
        this.balance = balance
    }
    deposit(amount) {
        if (amount <= 0) throw new Error ('El monto a depositar debe ser mayor a 0')
        this.balance += amount
        return this.balance
    }
    withdraw(amount) {
        if (amount <= 0) throw new Error ('El monto a retirar debe ser mayor a 0')
        else if (amount > this.balance) throw new Error ('Saldo insuficiente')
        this.balance -= amount
        return this.balance
    }
}

const account1 = new bankAccount('José María','1456',300)
const account2 = new bankAccount('Mariluz','1223',5000)
account1.deposit(700)
console.log(account1.balance)
console.log(account1.deposit === account2.deposit)*/

class robot {
    constructor (name){
        this.name = name
    }
    encender() { console.log('sistema activo')}
}

const robot1 = new robot('R2D2')
const robot2 = new robot('C3PO')
robot1.encender = null
delete robot1.encender
robot1.encender()
