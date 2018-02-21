import React from 'react'
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('the Products component', () => {
    let Products

    beforeEach(() => {
        Products = shallow(<Products products={[{id: 1, title: 'Obsidian', price: 42}]} />)
    })

    it('renders the product title in a span tag', () => {
        expect(Products.find('span').text()).to.be.equal('Obsidian')
      })



})







// describe('UserHome', () => {
//   let userHome

//   beforeEach(() => {
//     userHome = shallow(<UserHome email={'cody@email.com'} />)
//   })

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
//   })
// })
