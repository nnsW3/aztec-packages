#pragma once

#include "barretenberg/relations/generic_lookup/generic_lookup_relation.hpp"

#include <cstddef>
#include <tuple>

namespace bb {

/**
 * @brief This class contains an example of how to set LookupSettings classes used by the
 * GenericLookupRelationImpl class to specify a scaled lookup
 *
 * @details To create your own lookup:
 * 1) Create a copy of this class and rename it
 * 2) Update all the values with the ones needed for your lookup
 * 3) Update "DECLARE_LOOKUP_IMPLEMENTATIONS_FOR_ALL_SETTINGS" and "DEFINE_LOOKUP_IMPLEMENTATIONS_FOR_ALL_SETTINGS" to
 * include the new settings
 * 4) Add the relation with the chosen settings to Relations in the flavor (for example,"`
 *   using Relations = std::tuple<GenericLookupRelation<ExampleXorLookupSettings,
 * FF>>;)`
 *
 */
class kernel_output_lookup_lookup_settings {
  public:
    static constexpr size_t READ_TERMS = 1;
    static constexpr size_t WRITE_TERMS = 1;
    static constexpr size_t READ_TERM_TYPES[READ_TERMS] = { 0 };
    static constexpr size_t WRITE_TERM_TYPES[WRITE_TERMS] = { 0 };
    static constexpr size_t LOOKUP_TUPLE_SIZE = 4;
    static constexpr size_t INVERSE_EXISTS_POLYNOMIAL_DEGREE = 4;
    static constexpr size_t READ_TERM_DEGREE = 0;
    static constexpr size_t WRITE_TERM_DEGREE = 0;

    template <typename AllEntities> static inline auto inverse_polynomial_is_computed_at_row(const AllEntities& in)
    {
        return (in.main_sel_q_kernel_output_lookup == 1 || in.kernel_q_public_input_kernel_out_add_to_table == 1);
    }

    template <typename Accumulator, typename AllEntities>
    static inline auto compute_inverse_exists(const AllEntities& in)
    {
        using View = typename Accumulator::View;
        const auto is_operation = View(in.main_sel_q_kernel_output_lookup);
        const auto is_table_entry = View(in.kernel_q_public_input_kernel_out_add_to_table);
        return (is_operation + is_table_entry - is_operation * is_table_entry);
    }

    template <typename AllEntities> static inline auto get_const_entities(const AllEntities& in)
    {
        return std::forward_as_tuple(in.kernel_output_lookup,
                                     in.kernel_output_lookup_counts,
                                     in.main_sel_q_kernel_output_lookup,
                                     in.kernel_q_public_input_kernel_out_add_to_table,
                                     in.kernel_kernel_out_offset,
                                     in.main_ia,
                                     in.kernel_side_effect_counter,
                                     in.main_ib,
                                     in.main_clk,
                                     in.kernel_kernel_value_out,
                                     in.kernel_kernel_side_effect_out,
                                     in.kernel_kernel_metadata_out);
    }

    template <typename AllEntities> static inline auto get_nonconst_entities(AllEntities& in)
    {
        return std::forward_as_tuple(in.kernel_output_lookup,
                                     in.kernel_output_lookup_counts,
                                     in.main_sel_q_kernel_output_lookup,
                                     in.kernel_q_public_input_kernel_out_add_to_table,
                                     in.kernel_kernel_out_offset,
                                     in.main_ia,
                                     in.kernel_side_effect_counter,
                                     in.main_ib,
                                     in.main_clk,
                                     in.kernel_kernel_value_out,
                                     in.kernel_kernel_side_effect_out,
                                     in.kernel_kernel_metadata_out);
    }
};

template <typename FF_>
using kernel_output_lookup_relation = GenericLookupRelation<kernel_output_lookup_lookup_settings, FF_>;
template <typename FF_> using kernel_output_lookup = GenericLookup<kernel_output_lookup_lookup_settings, FF_>;

} // namespace bb