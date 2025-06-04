import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface TeamMemberProps {
  name: string;
  role: string;
  company: string;
  avatar: string;
}

const TeamMember = ({ name, role, company, avatar }: TeamMemberProps) => (
  <div className="flex flex-col items-center p-4">
    <Avatar className="h-20 w-20 mb-3">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <h3 className="font-medium text-lg">{name}</h3>
    <p className="text-sm text-muted-foreground">{role}</p>
    <Badge variant="outline" className="mt-1">
      {company}
    </Badge>
  </div>
);

export default TeamMember;
