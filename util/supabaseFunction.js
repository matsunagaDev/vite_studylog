import { supabase } from '../util/supabase';

// select
export const getAllRecords = async () => {
  const records = await supabase
    .from('study-record')
    .select('*')
    .order('created_at');
  return records.data;
};

// insert
export const addRecord = async (LearnTitle, LearnTime) => {
  await supabase
    .from('study-record')
    .insert({ learn_title: LearnTitle, learn_time: LearnTime });
};

// delete
export const deleteRecord = async (id) => {
  await supabase.from('study-record').delete().eq('id', id);
};
