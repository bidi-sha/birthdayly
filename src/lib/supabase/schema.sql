alter table birthdays add column if not exists category text default 'All';
alter table birthdays add column if not exists notes text;
-- Storage policies for birthday-media

create policy "Users can upload to their own folder"
on storage.objects
for insert
with check (
  bucket_id = 'birthday-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can view their own files"
on storage.objects
for select
using (
  bucket_id = 'birthday-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update their own files"
on storage.objects
for update
using (
  bucket_id = 'birthday-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their own files"
on storage.objects
for delete
using (
  bucket_id = 'birthday-media'
  and (storage.foldername(name))[1] = auth.uid()::text
);