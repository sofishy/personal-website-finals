import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase;

  constructor() {
    // REPLACE WITH YOUR SUPABASE CREDENTIALS
    const supabaseUrl = 'https://vsbutjrjautiubiefcmg.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYnV0anJqYXV0aXViaWVmY21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzM5MDgsImV4cCI6MjA4NzM0OTkwOH0.H-F-u5qQVyA2tSNdKWXErxxuiBVvFg5b69g0isd0XH8';
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected');
  }

  async getMessages() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .eq('website', 'personal-website-finals')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error:', error);
      return [];
    }
    return data || [];
  }

  async addMessage(name: string, message: string) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([{ name, message, website: 'personal-website-finals' }])
      .select();

    if (error) {
      console.error('❌ Error:', error);
      throw error;
    }
    return data;
  }
}