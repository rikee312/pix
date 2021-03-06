import {expect} from 'chai';
import {describe, it, beforeEach} from 'mocha';
import {setupComponentTest} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

describe('Integration | Component | comparison-window', function () {

  setupComponentTest('comparison-window', {
    integration: true
  });

  describe('rendering', function () {

    let answer;
    let challenge;
    let solution;

    beforeEach(function () {
      answer = Ember.Object.create({ value: '1,2', result: 'ko' });
      challenge = Ember.Object.create({
        instruction: 'This is the instruction',
        proposals: '' +
        '- 1ere possibilite\n ' +
        '- 2eme possibilite\n ' +
        '- 3eme possibilite\n' +
        '- 4eme possibilite'
      });
      solution = Ember.Object.create({ value: '2,3' });

      this.set('answer', answer);
      this.set('challenge', challenge);
      this.set('solution', solution);
      this.set('index', '3');
    });

    it('renders', function () {
      // when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      // then
      expect(this.$()).to.have.lengthOf(1);
    });

    it('should render challenge result in the header', function () {
      // when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      // then
      expect(this.$('.comparison-window__header')).to.have.length(1);
    });

    it('should render challenge instruction', function () {
      // when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      // then
      expect(this.$('.challenge-statement__instruction')).to.have.length(1);
    });

    it('should not render corrected answers when challenge has no type', function () {
      // when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      // then
      expect(this.$('.comparison-window__corrected-answers')).to.have.length(0);
    });

    it('should render corrected answers when challenge type is QROC', function () {
      // given
      challenge = Ember.Object.create({type: 'QROC'});
      this.set('challenge', challenge);
      // when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      // then
      expect(this.$('.comparison-window__corrected-answers--qroc')).to.have.length(1);
    });

    it('should render corrected answers when challenge type is QCM', function () {
      // given
      challenge = Ember.Object.create({type: 'QCM'});
      this.set('challenge', challenge);
      // when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      // then
      expect(this.$('.qcm-solution-panel')).to.have.length(1);
    });

    it('should render a feedback panel', function () {
      //when
      this.render(hbs`{{comparison-window answer challenge solution index}}`);
      //then
      expect(this.$('.comparison-window__feedback-panel')).to.have.length(1);
    });
  });
});
