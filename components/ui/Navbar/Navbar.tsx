import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Logo from '@/components/icons/Logo';
import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <>
      <nav className={s.root}>
        <a href="#skip" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <div className="max-w-6xl px-6 mx-auto">
          <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div className="flex items-center flex-1">
              <Link href="/" className={s.logo}>
                fms
              </Link>
              <nav className="hidden ml-6 space-x-2 lg:block">
                
                {!user ?
                  <>
                    <Link href="/" className={s.link}>
                      pricing
                    </Link>
                  </>
                :
                  <>
                    <Link href="/account" className={s.link}>
                      account
                    </Link>
                    <Link href="/account" className={s.link}>
                      premium
                    </Link>
                    <Link href="/admin" className={s.link}>
                      admin
                    </Link>
                  </>
                }
              </nav>
            </div>
            <div className="flex justify-end flex-1 space-x-8">
              {user ? (
                <SignOutButton />
              ) : (
                <Link href="/signin" className={s.link}>
                  sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
