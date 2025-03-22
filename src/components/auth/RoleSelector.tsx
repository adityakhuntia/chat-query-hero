
import React from 'react';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const RoleSelector: React.FC = () => {
  const { isAuthenticated, userRole, login, logout } = useAuth();
  
  const roles: { value: UserRole; label: string }[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'employee', label: 'Employee' },
    { value: 'parent', label: 'Parent' },
  ];
  
  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4 text-center">
            {isAuthenticated 
              ? `Logged in as ${userRole}` 
              : 'Select a role to login'}
          </h2>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {!isAuthenticated ? (
              roles.map(role => (
                <Button
                  key={role.value}
                  variant="outline"
                  onClick={() => login(role.value)}
                  className={cn(
                    "transition-all duration-300 hover:scale-105",
                    "border border-border hover:border-primary"
                  )}
                >
                  Login as {role.label}
                </Button>
              ))
            ) : (
              <Button 
                variant="outline" 
                onClick={logout}
                className="text-destructive border border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
