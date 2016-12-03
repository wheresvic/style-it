import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-02', () => {
  it('creates a union and contains selector scope for root selectors', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            .foo {
              color: red;
            }
          `}

          <div className="foo">
            <div className="foo"></div>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('foo _scoped--989459294');
    expect(removeNewlines(styleNode.textContent)).toEqual(` .foo._scoped--989459294 , ._scoped--989459294  .foo { color: red; }`);
  });
});