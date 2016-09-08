import Ember from 'ember';

const { computed, inject } = Ember;

const ChallengeItem = Ember.Component.extend({

  tagName: 'article',
  classNames: ['challenge-item'],
  attributeBindings: ['challenge.id:data-challenge-id'],

  assessmentService: inject.service('assessment'),

  challenge: null,
  assessment: null,
  selectedProposal: null,
  error: null,

  hasIllustration: computed.notEmpty('challenge.illustrationUrl'),
  isChallengePreviewMode: computed.empty('assessment'),
  hasError: computed.notEmpty('error'),

  challengeIsTypeQROC: computed('challenge.type', function () {
    return this.get('challenge.type') === 'QROC' || this.get('challenge.type') === 'QROCM';
  }),
  challengeIsTypeQCM: computed.equal('challenge.type', 'QCM'),
  challengeIsTypeQCU: computed.equal('challenge.type', 'QCU'),

  onSelectedProposalChanged: Ember.observer('selectedProposal', function () {
    this.set('error', null);
  }),

  didUpdateAttrs() {
    this._super(...arguments);
    this.set('selectedProposal', null);
  },

  actions: {
    validate(challenge, assessment) {
      if (Ember.isEmpty(this.get('selectedProposal'))) {

        const errorMessage = 'Vous devez sélectionner une réponse.';
        this.set('error', errorMessage);
        this.sendAction('onError', errorMessage);
        return;
      }
      const value = this._adaptSelectedProposalValueToBackendValue(this.get('selectedProposal'));
      this.sendAction('onValidated', challenge, assessment, value);
    },
    skip() {
      this.set('error', null);
      this.sendAction('onValidated', this.get('challenge'), this.get('assessment'), '#ABAND#')
    }
  },

  _adaptSelectedProposalValueToBackendValue(value) {
    return `${value + 1}`;
  }
});

ChallengeItem.reopenClass({
  positionalParams: ['challenge', 'assessment']
});

export default ChallengeItem;