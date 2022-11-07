<script setup>
/* eslint-disable */
import Api from "@/axios/axios";
import { ref } from "vue";
import BreadCrumb from "@/components/breadcrumb/BabengBreadcrumb.vue"
import { useStoreAdmin } from "@/stores/admin";
import ButtonEdit from "@/components/Button/ButtonEdit.vue";
import ButtonDelete from "@/components/Button/ButtonDel.vue";
const storeAdmin = useStoreAdmin();
storeAdmin.setPagesActive("produk");
const data = ref([]);

const columns = [
    {
        label: "Actions",
        field: "actions",
        sortable: false,
        width: "50px",
        tdClass: "text-center",
        thClass: "text-center",
    },
    {
        label: "Judul",
        field: "nama",
        type: "String",
    },
    {
        label: "Tipe",
        field: "tipe",
        type: "String",
    },
    {
        label: "File",
        field: "file",
        type: "String",
    },
];
</script>
<template>
    <BreadCrumb />
    <!-- <h4>Ini Produk index</h4> -->
    <div>

        <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
            enabled: true,
        }" :pagination-options="{
    enabled: true,
    perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-row="props">
                <span v-if="props.column.field == 'actions'">
                    <div class="text-sm font-medium text-center flex justify-center space-x-1">
                        <ButtonEdit @click="doEditData(props.row.id, props.index)" />
                        <ButtonDelete @click="doDeleteData(props.row.id, props.index)" />
                    </div>
                </span>

                <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                </span>
            </template>
        </vue-good-table>
    </div>
</template>