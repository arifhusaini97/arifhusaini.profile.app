//index.js
import Repository from '@/repositories/RepositoryFactory';
const repository = Repository.get('candidates');
export default {
  getCandidatesRanked: async ({ commit }, { lazyParams }) => {
    var response = await repository.getCandidatesRanked(lazyParams);
    console.log(response.data.result);
    commit('SET_candidates_ranked', response.data.result);
  },

  setFilters: async ({ commit }, { payload }) => {
    commit('SET_filters', payload);
  },

  resetFilters: async ({ commit }) => {
    commit('RESET_filters');
  },

  getCandidatesFavorite: async ({ commit }, { lazyParams }) => {
    var response = await repository.getCandidatesFavorite(lazyParams);
    console.log(response.data.result);
    commit('SET_candidates_favorite', response.data.result);
  },

  getCandidatesSheet: async ({ commit }, { lazyParams }) => {
    var response = await repository.getCandidatesSheet(lazyParams);
    console.log(response.data.result);
    commit('SET_candidates_sheet', response.data.result);
  },

  getCategories: async ({ commit }, { lazyParams }) => {
    var response = await repository.getCategories(lazyParams);
    console.log(response.data.result);
    commit('SET_categories', response.data.result);
  },

  getSubCategories: async ({ commit }, { lazyParams }) => {
    var response = await repository.getSubCategories(lazyParams);
    console.log(response.data.result);
    commit('SET_sub_categories', response.data.result);
  },

  getTopics: async ({ commit }, { lazyParams }) => {
    var response = await repository.getTopics(lazyParams);
    console.log(response.data.result);
    commit('SET_topics', response.data.result);
  },

  setFavorite: async ({ commit }, { payload }) => {
    commit('SET_favorite', payload);
  },

  setVote: async ({ commit }, { payload }) => {
    commit('SET_vote', payload);
  },

  setVoteDone: async ({ commit }, { payload }) => {
    commit('SET_vote_done', payload);
  },

  setNewRound: async ({ commit, state }) => {
    let flag = false;
    let point = null;

    for (const x in state.candidates_round_rank) {
      if (point === null) {
        point = state.candidates_round_rank[x].local.total_point;
      } else if (point === state.candidates_round_rank[x].local.total_point) {
        flag = true;
        break;
      } else {
        point = state.candidates_round_rank[x].local.total_point;
      }
    }
    if (flag) {
      commit('SET_new_round');
      return { is_done_entirely: false };
    } else {
      console.log(state.candidates_round_rank);
      return { is_done_entirely: true };
    }
  },
};
