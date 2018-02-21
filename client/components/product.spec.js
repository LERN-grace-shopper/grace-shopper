import 'jsdom-global/register';
import {expect} from 'chai'
import React from 'react'
import enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Product from './product'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('the Product component', () => {
    let Product

    // beforeEach(() => {
    //     Product = shallow(<Product product={{id: 1, title: 'Obsidian', price: 42}} />)
    // })

    it('renders the product title in an h1 tag', () => {
        const wrapper = mount(<Product product={{id: 1, title: 'Obsidian', price: 42}} />)
        expect(Product.find('h1').text()).to.be.equal('Obsidian')
      })



})


// describe('<Foo />', () => {
//     it('calls componentDidMount', () => {
//       const wrapper = mount(<Foo />);
//       expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
//     });
//   });